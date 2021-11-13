import { createRenderer } from "../../lib/small-vue.esm.js";
import { App } from "./App.js";

const game = new PIXI.Application({
  width: 500,
  height: 500,
});

document.body.append(game.view);

const renderer = createRenderer({
  createElement(type) {
    if (type === "rect") {
      const rect = new PIXI.Graphics();
      rect.beginFill(0xff0000);
      rect.drawRect(0, 0, 100, 100);
      rect.endFill();

      return rect;
    }
  },
  patchProp(el, key, val) {
    el[key] = val;
  },
  insert(el, parent) {
      parent.addChild(el)
  },
});

renderer.createApp(App).mount(game.stage);

// const rootContainer = document.querySelector('#app')
// TODO: 完成字符串的查找工作
// createApp(App).mount("#app");
// createApp(App).mount(rootContainer);
