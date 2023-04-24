/*
 * @Author: chenyx
 * @Date: 2022-02-26 12:32:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 23:40:55
 * @FilePath: /backstage/src/main.ts
 */
import { createApp } from "vue";
import { setupStore } from '@/store';

import "./assets/css/app.css";
import App from "./App.vue";
import "./permission"
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";

const app = createApp(App).use(router);
// 全局挂载
setupStore(app);
globalComponents(app);
utils(app);

app.mount("#app");
