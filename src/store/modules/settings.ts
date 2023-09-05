import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
	state: () => ({
		// settings的参数和初始数据
		modelList: [],
		modelVersion: [] as string[],
		modelLoadingState: false,
		createVal: 0,
		multiVal: 0,
		geneVal: 0,
		// 已创建的聊天记录列表
		chatList: [],
		// 当前聊天id
		chatCurrentId: "",
	}),
	actions: {
		setModelLoadingState(val: boolean) {
			this.$patch((state) => {
				state.modelLoadingState = val;
			});
		},
		setVal({ key, val }) {
			this.$patch((state) => {
				state[key] = val;
			});
		},
	},
	persist: {
		enabled: true,
		strategies: [
			{
				storage: sessionStorage,
			},
		],
	},
});
