import axios, { AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders, AxiosResponse, AxiosError } from "axios";
import qs from "qs";

// 创建实例
const service: AxiosInstance = axios.create({
	timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// post formdata的配置
		if (config.isFormData) {
			(config.headers as RawAxiosRequestHeaders)["Content-Type"] = "application/x-www-form-urlencoded";
			config.data = qs.stringify(config.data);
		}
		return config;
	},
	(error: AxiosError) => {
		Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

export const get = (url: string, params?: any, responseType?: any, timeout?: number) => {
	return new Promise<any>((resolve, reject) => {
		service({
			method: "get",
			url,
			params,
			responseType,
			timeout,
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const post = (url: string, params: any, isFormData = false, timeout?: number) => {
	return new Promise<any>((resolve, reject) => {
		service({
			method: "post",
			url,
			data: params,
			isFormData,
			timeout,
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const put = (url: string, params: any, timeout?: number) => {
	return new Promise<any>((resolve, reject) => {
		service({
			method: "put",
			url,
			data: params,
			timeout,
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const patch = (url: string, params: any, timeout?: number) => {
	return new Promise<any>((resolve, reject) => {
		service({
			method: "patch",
			url,
			data: params,
			timeout,
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const del = (url: string, params?: any, isFormData = false, timeout?: number) => {
	return new Promise<any>((resolve, reject) => {
		service({
			method: "delete",
			url,
			data: params,
			isFormData,
			timeout,
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
