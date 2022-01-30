import { App } from "./App.js";
import { createApp } from "../../lib/small-vue.esm.js";

const rootContainer = document.querySelector('#app')
// 更新逻辑 => 两个对象之间的对比
createApp(App).mount(rootContainer);