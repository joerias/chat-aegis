import * as axios from "axios";
declare module "qs" {
	import qs from "qs";
	export default qs;
}

declare module "axios" {
	interface AxiosInstance {
		(config: AxiosRequestConfig): Promise<any>;
	}
	export interface AxiosRequestConfig {
		isFormData?: boolean;
	}
}
