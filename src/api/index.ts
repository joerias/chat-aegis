import { get, post, put, patch, del } from "@/api/request";

// 初始化获取token
export const start = () => {
	return get("/service/start");
};

// 获取模型列表
export const chatModels = () => {
	return get("/service/api/chat/models");
};

// 启动模型
export const startModel = (params) => {
	return post("/service/api/start/model", params);
};

// 获取chat列表
export const chatList = () => {
	return get("/service/api/chats");
};
