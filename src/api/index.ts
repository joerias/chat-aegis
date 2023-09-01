import { get, post, put, patch, del } from "@/api/request";

export const start = () => {
	return get("/service/start");
};

export const chatModels = () => {
	return get("/service/api/chat/models");
};

export const chatList = () => {
	return get("/service/api/chats");
};
