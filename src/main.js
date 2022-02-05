import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/less/index.less";
import "lib-flexible";
import Vant from "vant";
import "vant/lib/index.css";
import "./less/nake.css";
import "animate.css";

createApp(App).use(store).use(router).use(Vant).mount("#app");
