<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import Chat from "@/components/chat/index.vue";
import Settings from "@/components/settings/index.vue";
</script>

<template>
	<el-config-provider :locale="zhCn">
		<Chat />
		<Settings />
	</el-config-provider>
</template>
