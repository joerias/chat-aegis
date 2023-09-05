<script setup>
defineOptions({
	name: "List",
});
import { onBeforeMount } from "vue";
import { chatList, chatLabelModify, chatDel } from "@/api";
import { useSettingsStore } from "@/store/modules/settings";
import { storeToRefs } from "pinia";

const settingsStore = useSettingsStore();
const { chatList: historyList, chatCurrentId } = storeToRefs(settingsStore);

onBeforeMount(() => {
	getChatList();
});

// 获得已有对话列表
const getChatList = async () => {
	try {
		const {
			data: { data },
		} = await chatList();
		data.forEach((v) => (v.edit = false));
		settingsStore.setVal({ key: "chatList", val: data });
		settingsStore.setVal({ key: "chatCurrentId", val: data[0].id });
	} finally {
	}
};

// 切换聊天记录
const handleSwitchChat = (idx) => {
	settingsStore.setVal({ key: "chatCurrentId", val: historyList.value[idx].id });
};

// 记录label修改
const handleEdit = async (idx, type) => {
	switch (type) {
		case 1:
			await chatLabelModify(historyList.value[idx].id, { name: historyList.value[idx].name });
			getChatList();
			break;
		case -1:
			historyList.value[idx].edit = false;
			break;
		default:
			historyList.value[idx].edit = true;
	}
};

// 记录删除
const handleDel = async (idx) => {
	await chatDel(historyList.value[idx].id);
	getChatList();
};
</script>

<template>
	<div class="history-list">
		<div class="title">最近的聊天</div>
		<ul class="ul">
			<li v-for="(o, i) in historyList" :key="i" :class="{ cur: o.id === chatCurrentId }">
				<el-icon class="logo"><ChatLineSquare /></el-icon>
				<span class="label">
					<span class="label-txt" v-show="!o.edit" @click="handleSwitchChat(i)">
						{{ o.name }}
					</span>
					<el-input v-show="o.edit" v-model="o.name" @keyup.enter="handleEdit(i, 1)" />
				</span>
				<div class="btns state" v-if="!o.edit">
					<el-icon class="btn" @click="handleEdit(i)"><EditPen /></el-icon>
					<el-icon class="btn" @click="handleDel(i)"><Delete /></el-icon>
				</div>
				<div class="btns judge" v-else>
					<el-icon class="btn right" @click="handleEdit(i, 1)"><Check /></el-icon>
					<el-icon class="btn wrong" @click="handleEdit(i, -1)"><Close /></el-icon>
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang="less" scoped>
@import "./history-list.less";
</style>
