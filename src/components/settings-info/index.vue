<script setup lang="ts">
defineOptions({
	name: "SettingsInfo",
});

import { computed } from "vue";
import { useSettingsStore } from "@/store/modules/settings";
import { storeToRefs } from "pinia";

const settingsStore = useSettingsStore();
const { modelList, modelVersion, createVal, multiVal, geneVal } = storeToRefs(settingsStore);

const modelVersionName = computed<{ parent: string; children: string }>(() => {
	let parent, children;
	modelList.value.forEach((v) => {
		if (v.value === modelVersion.value[0]) {
			parent = v.label;
			v.children.forEach((v2) => {
				if (v2.value === modelVersion.value[1]) children = v2.label;
			});
		}
	});
	return {
		parent,
		children,
	};
});
</script>

<template>
	<div class="settings-info">
		<span class="p"> 当前设置模型为{{ modelVersionName.parent }}-{{ modelVersionName.children }}</span>
		<span class="p"> 创造性程度值{{ createVal }} </span>
		<span class="p"> 多样性程度值{{ multiVal }} </span>
		<span class="p"> 生成长度为{{ geneVal }} </span>
	</div>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>
@/store/modules/settings
