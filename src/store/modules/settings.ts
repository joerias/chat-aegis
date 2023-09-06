import { defineStore } from "pinia";

type TypeSetVal = {
	[key: string]: any;
};

export const useSettingsStore = defineStore("settings", {
	state: () => ({
		// settings的参数和初始数据
		modelList: [],
		modelVersion: [] as string[],
		modelLoadingState: false,
		modelState: false,
		createVal: 0,
		multiVal: 0,
		geneVal: 0,
		// 已创建的聊天记录列表
		chatList: [],
		// 当前聊天id
		chatCurrentId: "",
	}),
	actions: {
		setVal(obj: TypeSetVal) {
			this.$patch((state) => {
				for (const [k, v] of Object.entries(obj)) {
					state[k] = v;
				}
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
