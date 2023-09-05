import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "@/router/permission";
import pinia from "@/store/store";
import "animate.css";
import "@/less/index.less";
import * as ElIcons from "@element-plus/icons-vue";

const app = createApp(App);

// icon
for (const i in ElIcons) {
	app.component(i, ElIcons[i]);
}

app.use(router).use(pinia).mount("#app");
