import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "@/router/permission";
import pinia from "@/store/store";
import "animate.css";
import "@/less/index.less";

const app = createApp(App);
app.use(router).use(pinia).mount("#app");
