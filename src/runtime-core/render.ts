import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // 调用patch方法
  patch(vnode, container);
}

function patch(vnode, container) {
  // 处理组件

  // TODO:判断这个vnode是不是element类型?处理element:处理component
  // 思考题：如何去区分是element类型还是component类型 -> 判断他的type是不是对象
  // processElement()
  isObject(vnode.type) ? processComponent(vnode, container) : processElement(vnode)
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function processElement(vnode: any) {
  mountElement(vnode);
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function mountElement(vnode: any) {
  // ...
}


function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container);
}
