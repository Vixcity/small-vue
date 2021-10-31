import { App } from "./App.js";
import { createApp } from "../../lib/small-vue.esm.js";

const rootContainer = document.querySelector('#app')
// TODO: 完成字符串的查找工作
// createApp(App).mount("#app");
createApp(App).mount(rootContainer);

