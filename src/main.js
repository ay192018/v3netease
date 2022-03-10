import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/less/index.less";
import "lib-flexible";
import Vant from "vant";
import "vant/lib/index.css";
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
import "animate.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .use(NutUI)
  .mount("#app");
