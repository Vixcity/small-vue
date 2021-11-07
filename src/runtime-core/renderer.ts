import { isOn } from "../shared/index";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { Fragment, Text } from "./vnode";

export function render(vnode, container) {
  // 调用patch方法
  patch(vnode, container, null);
}

function patch(vnode, container, parentComponent) {
  // 处理组件
  // ShapeFlags
  // vnode -> flag
  const { type, shapeFlag } = vnode;

  // fragment => 只渲染children
  switch (type) {
    case Fragment:
      processFragment(vnode, container,parentComponent);
      break;

    case Text:
      processText(vnode, container);
      break;

    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container,parentComponent);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComponent);
      }
      break;
  }
}

function processText(vnode: any, container: any) {
  const { children } = vnode;
  const textNode = (vnode.el = document.createTextNode(children));
  container.append(textNode);
}

function processFragment(vnode: any, container: any,parentComponent) {
  mountChildren(vnode, container,parentComponent);
}

function processComponent(vnode: any, container: any, parentComponent) {
  mountComponent(vnode, container, parentComponent);
}

function processElement(vnode: any, container: any,parentComponent) {
  mountElement(vnode, container,parentComponent);
}

function mountComponent(initinalVNode: any, container, parentComponent) {
  const instance = createComponentInstance(initinalVNode, parentComponent);

  setupComponent(instance);
  setupRenderEffect(instance, initinalVNode, container);
}

function mountElement(vnode: any, container: any,parentComponent) {
  const { children, type, props, shapeFlag } = vnode;
  const el = (vnode.el = document.createElement(type));

  // string || array
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // text_children
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // array_children
    mountChildren(vnode, el,parentComponent);
  }

  for (const key in props) {
    const val = props[key];

    // console.log(key)
    // 具体 => 通用
    // on + eventName

    if (isOn(key)) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }

  container.append(el);
}

function mountChildren(vnode, container,parentComponent) {
  vnode.children.forEach((v) => {
    patch(v, container,parentComponent);
  });
}

function setupRenderEffect(instance: any, initinalVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container,instance);

  initinalVNode.el = subTree.el;
}
