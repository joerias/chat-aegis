<script setup>
defineOptions({
	name: "Chat",
});
import { ref, onBeforeMount, computed } from "vue";
import MarkdownIt from "./markdown-it.vue";
import SettingsInfo from "@/components/settings-info/index.vue";
import { chatList } from "@/api";
import { useSettingsStore } from "@/store/modules/settings";
import { storeToRefs } from "pinia";
import { useWindowSize } from "@vueuse/core";
import { CircleClose } from "@element-plus/icons-vue";

function openSetting() {}

const { height } = useWindowSize();
const clientHeight = computed(() => `${height.value}px`);

const settingsStore = useSettingsStore();
// const { chatList } = storeToRefs(settingsStore);

onBeforeMount(() => {
	getChatList();
});

// 获得已有对话列表
const getChatList = async () => {
	try {
		const {
			data: { data },
		} = await chatList();
		console.log(data);
		// settingsStore.setVal({ key: "modelList", val: data });
		// settingsStore.setVal({ key: "modelVersion", val: data[0].name });
	} finally {
	}
};

const isMiniClear = ref(false);
const handleFocus = () => {
	isMiniClear.value = true;
};
const handleBlur = () => {
	isMiniClear.value = false;
};

const keyword = ref("");
const handleSend = (val) => {
	console.log(val);
};
</script>

<template>
	<div
		class="chat-container"
		:style="{
			height: clientHeight,
		}"
	>
		<div class="chat-list">
			<el-auto-resizer>
				<template #default="{ height }">
					<el-scrollbar ref="scrollContainer" :height="height">
						<div class="welcome-wrapper">
							<span class="title">欢迎使用擎盾AI智能助手</span>
							<span class="label animate__animated animate__bounceInDown"> 法律知识增强版 </span>
						</div>
						<div class="example-wrapper">
							<div
								class="item-wrapper animate__animated animate__bounceInDown"
								style="animation-delay: 0.3s"
							>
								<div class="title">🧐 提出复杂问题</div>
								<div class="message-card">"我可以为我挑剔的只吃橙色食物的孩子做什么饭?"</div>
							</div>
							<div
								class="item-wrapper animate__animated animate__bounceInDown"
								style="animation-delay: 0.5s"
							>
								<div class="title">🙌 获取更好的答案</div>
								<div class="message-card">"销量最高的 3 种宠物吸尘器有哪些优点和缺点?"</div>
							</div>
							<div
								class="item-wrapper animate__animated animate__bounceInDown"
								style="animation-delay: 0.7s"
							>
								<div class="title">🎨 获得创意灵感</div>
								<div class="message-card">"以海盗的口吻写一首关于外太空鳄鱼的俳句?"</div>
							</div>
						</div>
						<div class="tips-wrapper animate__animated animate__bounceInUp" style="animation-delay: 0.9s">
							回车发送对话，shift+回车换行。
						</div>

						<template v-for="(item, index) in chatList">
							<div class="chat-list__item" v-if="item.role !== 'system'">
								<div
									class="message-card animate__animated animate__fadeInUp"
									:class="{ 'is-right': item.role === 'user' }"
								>
									<section class="list-item__text">
										<MarkdownIt :model-value="item.content"></MarkdownIt>
									</section>
									<div class="extend-wrapper" v-if="!pending" @click.stop="deleteMessage(index)">
										<el-icon color="#F56C6C" size="18px">
											<CircleClose />
										</el-icon>
									</div>
								</div>
							</div>
						</template>
					</el-scrollbar>
				</template>
			</el-auto-resizer>
		</div>

		<div class="chat-enter animate__animated animate__fadeInUp">
			<div class="clear-wrapper" :class="{ mini: isMiniClear }" @click="clearHandle">
				<div class="icon">
					<i-game-icons-magic-broom />
				</div>
				<div class="tips">新对话</div>
			</div>

			<div class="enter-wrapper">
				<div class="enter-icon">
					<i-ph-chat-circle-text-light />
				</div>
				<el-input
					type="textarea"
					placeholder="有问题尽管问我..."
					resize="none"
					maxlength="2000"
					enterkeyhint="send"
					autocorrect="off"
					show-word-limit
					:autosize="{ minRows: 1, maxRows: 8 }"
					v-model="keyword"
					@focus="handleFocus"
					@blur="handleBlur"
					@keydown.enter.prevent="handleSend"
				></el-input>

				<div class="is-pending" v-show="pending"></div>
			</div>
		</div>

		<SettingsInfo />
	</div>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>
