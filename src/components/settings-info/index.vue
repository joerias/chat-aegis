<script setup lang="ts">
defineOptions({
	name: "SettingsInfo",
});

import { useSettingsStore } from "@/store/modules/settings";
import { storeToRefs } from "pinia";

const settingsStore = useSettingsStore();
const { modelVersion, createVal, multiVal, geneVal } = storeToRefs(settingsStore);
</script>

<template>
	<div class="settings-info">
		<span class="p"> 当前设置模型为{{ modelVersion }} </span>
		<span class="p"> 创造性程度值{{ createVal }} </span>
		<span class="p"> 多样性程度值{{ multiVal }} </span>
		<span class="p"> 生成长度为{{ geneVal }} </span>
	</div>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>
@/store/modules/settings
