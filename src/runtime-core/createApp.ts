import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 转换成虚拟节点
      // component -> vnode
      // 所有的逻辑操作都会基于vnode

      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}
