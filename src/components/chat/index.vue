<script setup>
defineOptions({
	name: "Chat",
});
import { ref, onBeforeMount, computed } from "vue";
import HistoryList from "./history-list.vue";
import MarkdownIt from "./markdown-it.vue";
import SettingsInfo from "@/components/settings-info/index.vue";
import { chatNew, chatMsg } from "@/api";
import { useSettingsStore } from "@/store/modules/settings";
import { storeToRefs } from "pinia";
import { useWindowSize } from "@vueuse/core";

function openSetting() {}

const { height } = useWindowSize();
const clientHeight = computed(() => `${height.value}px`);

const settingsStore = useSettingsStore();
const { modelLoadingState, chatCurrentId } = storeToRefs(settingsStore);

onBeforeMount(() => {});

const pending = ref(false);

// 新对话按钮交互
const isMiniClear = ref(false);
const handleMsgBox = (type) => {
	isMiniClear.value = type === "focus";
};

// 输入框及交互
const keyword = ref("");
const handleSend = async (val) => {
	const params = {
		name: "模型名字",
		value: "模型枚举值",
	};
	await chatMsg(chatCurrentId.value, params);
};

// 快速提问
const handleFastQues = (val) => {
	keyword.value = val;
	handleSend();
};

// 新对话
const handleNew = async () => {
	const params = {
		name: "new chat",
	};
	try {
		const { data } = await chatNew(params);
	} finally {
	}
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
								<div
									class="message-card"
									@click="handleFastQues('我可以为我挑剔的只吃橙色食物的孩子做什么饭?')"
								>
									"我可以为我挑剔的只吃橙色食物的孩子做什么饭?"
								</div>
							</div>
							<div
								class="item-wrapper animate__animated animate__bounceInDown"
								style="animation-delay: 0.5s"
							>
								<div class="title">🙌 获取更好的答案</div>
								<div
									class="message-card"
									@click="handleFastQues('销量最高的 3 种宠物吸尘器有哪些优点和缺点?')"
								>
									"销量最高的 3 种宠物吸尘器有哪些优点和缺点?"
								</div>
							</div>
							<div
								class="item-wrapper animate__animated animate__bounceInDown"
								style="animation-delay: 0.7s"
							>
								<div class="title">🎨 获得创意灵感</div>
								<div
									class="message-card"
									@click="handleFastQues('以海盗的口吻写一首关于外太空鳄鱼的俳句?')"
								>
									"以海盗的口吻写一首关于外太空鳄鱼的俳句?"
								</div>
							</div>
						</div>
						<div class="tips-wrapper animate__animated animate__bounceInUp" style="animation-delay: 0.9s">
							<span v-show="modelLoadingState">模型载入中，请稍后...</span>
							<span v-show="modelState"> 模型载入完毕， </span>
							<span v-show="!modelState"> 模型加载失败， </span>
							<span v-show="!modelLoadingState">
								回车发送对话。点击上方快捷访问热点问答！
								<!-- 回车发送对话，shift+回车换行。点击上方快捷访问热点问答！ -->
							</span>
						</div>

						<!-- <template v-for="(item, index) in chatList">
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
						</template> -->
					</el-scrollbar>
				</template>
			</el-auto-resizer>
		</div>

		<div class="chat-enter animate__animated animate__fadeInUp">
			<div class="clear-wrapper" :class="{ mini: isMiniClear }" @click="handleNew">
				<el-icon><DocumentAdd /></el-icon>
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
					@focus="handleMsgBox('focus')"
					@blur="handleMsgBox('blur')"
					@keydown.enter.prevent="handleSend"
				></el-input>

				<div class="is-pending" v-show="pending"></div>
			</div>
		</div>

		<HistoryList />
		<SettingsInfo />
	</div>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>
