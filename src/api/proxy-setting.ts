const proxyDomain = {
	// 计算器部分
	"/service": {
		dev: "https://aegis-ai-chat.aegis-info.com/service/",
		test: "https://aegis-ai-chat.aegis-info.com/service/",
	},
};

export const proxy = {};

for (const i in proxyDomain) {
	proxy[i] = {
		target: proxyDomain[i][process.env.npm_lifecycle_event],
		changeOrigin: true,
		rewrite: (path) => path.replace(i, ""),
	};
}
