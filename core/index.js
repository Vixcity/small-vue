import { effectWatch } from "./reactivity/index.js";
import { mountElement } from "./renderer/index.js";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup();

      effectWatch(() => {
        rootContainer.innerHTML = ``;
        // const element = rootComponent.render(context);
        // 拿到虚拟DOM树
        const subTree = rootComponent.render(context);
        // 创建真实节点
        mountElement(subTree, rootContainer);
        // rootContainer.append(element);
      });
    },
  };
}
