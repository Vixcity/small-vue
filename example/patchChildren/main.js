import { App } from "./App.js";
import { createApp } from "../../lib/small-vue.esm.js";

const rootContainer = document.querySelector('#app')
createApp(App).mount(rootContainer);