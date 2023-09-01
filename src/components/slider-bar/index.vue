<script setup lang="ts">
defineOptions({
	name: "SliderBar",
});
import { useSettingsStore } from "@/store/modules/settings";

type Props = {
	modelValue: number;
	min?: number;
	max: number;
	step?: number;
	storeName: string;
};
const props = withDefaults(defineProps<Props>(), {
	min: 0,
	step: 1,
});
const { min, max, step, storeName } = props;
const settingsStore = useSettingsStore();

const modelValue = defineModel();

const handleChange = (val) => {
	settingsStore.setVal({ key: storeName, val });
};
</script>

<template>
	<div class="slider-bar">
		<div class="value">{{ min }}</div>
		<el-slider v-model="modelValue" :min="min" :max="max" :step="step" @change="handleChange" />
		<div class="value">{{ max }}</div>
	</div>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>
@/store/modules/settings
