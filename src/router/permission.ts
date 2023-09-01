import router from "./index";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { start } from "@/api";

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	console.log(1);
	next();
});
