import { visitNode } from "../../node_modules/typescript/lib/typescript";
import { isObject } from "../shared/index";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // 调用patch方法
  patch(vnode, container);
}

function patch(vnode, container) {
  // 处理组件
  // ShapFlags
  // vnode -> flag
  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container);
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
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
  const { children, type, props, shapeFlag } = vnode;
  const el = (vnode.el = document.createElement(type));

  // string || array
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // text_children
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // array_children
    mountChildren(vnode, el);
  }

  for (const key in props) {
    const val = props[key];

    console.log(key)
    // 具体 => 通用
    // on + eventName

    const isOn = (key:string) => /^on[A-Z]/.test(key)

    if(isOn(key)){
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event,val)
    } else {
      el.setAttribute(key, val);
    }
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
