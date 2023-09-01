<template>
	<div class="markdown-it__wrapper" v-html="htmlStr"></div>
</template>

<script setup>
import { computed } from "vue";
import { mdStr2html } from "@/utils/tools";

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
});

const htmlStr = computed(() => mdStr2html(props.modelValue));
</script>

<style lang="less" scoped>
@import "./markdown-it.less";
</style>
