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

// 获取对话列表
export const chatList = () => {
	return get("/service/api/chats");
};

// 新建对话
export const chatNew = (params) => {
	return post("/service/api/chats", params);
};

// 修改对话名称
export const chatLabelModify = (id, params) => {
	return put(`/service/api/chats/${id}`, params);
};

// 删除对话
export const chatDel = (id) => {
	return del(`/service/api/chats/${id}`);
};

// 聊天消息
export const chatMsg = (id) => {
	return get(`/service/api/chats/${id}/messages`);
};
