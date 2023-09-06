<script setup>
defineOptions({
	name: "Settings",
});
import { onBeforeMount, watch } from "vue";
import { useModal } from "@/hooks/useModal";
import drawer from "./drawer.vue";
import { chatModels, startModel } from "@/api";
import { useSettingsStore } from "@/store/modules/settings";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const settingsStore = useSettingsStore();
const { modelVersion } = storeToRefs(settingsStore);

onBeforeMount(() => {
	getChatModel();
});

// 载入模型列表
const getChatModel = async () => {
	settingsStore.setVal({ modelLoadingState: true });
	try {
		const {
			data: { data },
		} = await chatModels();
		// 非真数据补全
		if (data[0].pointModels.length === 0) {
			const childObj = [
				{
					id: "001",
					name: "单元1",
				},
				{
					id: "002",
					name: "单元2",
				},
			];
			data.forEach((v) => {
				v.pointModels = [...childObj];
			});
		}
		// 列表数据转换成组件可用格式
		const modelData = data.map((v) => {
			const children = [];
			v.pointModels.forEach((v2) => {
				children.push({
					label: v2.name,
					value: v2.id,
				});
			});
			return {
				label: v.name,
				value: v.id,
				children,
			};
		});
		// 选中数据转换成组件可用格式
		const { value } = modelData[0];
		const { value: childValue } = modelData[0].children[0];
		const modelSelected = [value, childValue];

		// 写入缓存
		settingsStore.setVal({ modelList: modelData, modelVersion: modelSelected });
	} finally {
	}
};

// 每次变更模型信息时运行模型
const setStartModel = async () => {
	settingsStore.setVal({ modelLoadingState: true });
	const params = {
		baseModelId: modelVersion[0],
		pointModelId: modelVersion[1],
	};
	try {
		const {
			data: { code, msg },
		} = await startModel();
		if (code === 200) {
			// 模型启动成功
		} else {
			// 模型启动失败
			ElMessage.error(msg);
		}
		settingsStore.setVal({ modelState: code === 200 });
	} finally {
		settingsStore.setVal({ modelLoadingState: false });
	}
};
watch(modelVersion, () => {
	setStartModel();
});

const handleSettings = () => {
	useModal(drawer);
};
</script>

<template>
	<div class="settings-box animate__animated animate__fadeIn" @click="handleSettings">
		<el-icon size="24px">
			<Setting />
		</el-icon>
	</div>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>
