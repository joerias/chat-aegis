<script setup>
defineOptions({
	name: "Settings",
});
import { onBeforeMount } from "vue";
import { Setting } from "@element-plus/icons-vue";
import { useModal } from "@/hooks/useModal";
import drawer from "./drawer.vue";
import { chatModels } from "@/api";
import { useSettingsStore } from "@/store/modules/settings";

const settingsStore = useSettingsStore();

onBeforeMount(() => {
	getChatModel();
});

const getChatModel = async () => {
	try {
		const {
			data: { data },
		} = await chatModels();
		settingsStore.setVal({ key: "modelList", val: data });
		settingsStore.setVal({ key: "modelVersion", val: data[0].name });
	} finally {
	}
};

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
@/store/modules/settings
