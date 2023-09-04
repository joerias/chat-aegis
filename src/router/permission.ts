import router from "./index";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { start } from "@/api";
import { createStorage } from "@/utils/storage.js";

const Storage = createStorage({ storage: localStorage });

const getStart = async () => {
	const {
		data: { data },
	} = await start();
	Storage.set("token", data);
};

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	if (!Storage.get("token")) {
		getStart();
	}

	next();
});
