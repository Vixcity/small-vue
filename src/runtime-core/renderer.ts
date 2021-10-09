import { visitNode } from "../../node_modules/typescript/lib/typescript";
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
  if (typeof vnode.type === "string") {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountComponent(initinalVNode: any, container) {
  const instance = createComponentInstance(initinalVNode);

  setupComponent(instance);
  setupRenderEffect(instance, initinalVNode, container);
}

function mountElement(vnode: any, container: any) {
  const { children, type, props } = vnode;
  const el = (vnode.el = document.createElement(type));

  // string || array
  if (typeof children === "string") {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }

  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }

  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function setupRenderEffect(instance: any, initinalVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container);

  initinalVNode.el = subTree.el;
}
