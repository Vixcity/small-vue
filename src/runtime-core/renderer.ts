import { effect } from "../reactivity/effect";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render(vnode, container) {
    // 调用patch方法
    patch(null, vnode, container, null);
  }

  // n1 => 之前的虚拟节点
  // n2 => 当前的虚拟节点
  function patch(n1, n2, container, parentComponent) {
    // 处理组件
    // ShapeFlags
    // vnode -> flag
    const { type, shapeFlag } = n2;

    // fragment => 只渲染children
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;

      case Text:
        processText(n1, n2, container);
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
        break;
    }
  }

  function processText(n1, n2: any, container: any) {
    const { children } = n2;
    const textNode = (n2.el = document.createTextNode(children));
    container.append(textNode);
  }

  function processFragment(n1, n2: any, container: any, parentComponent) {
    mountChildren(n2, container, parentComponent);
  }

  function processComponent(n1, n2: any, container: any, parentComponent) {
    mountComponent(n2, container, parentComponent);
  }

  function processElement(n1, n2: any, container: any, parentComponent) {
    if(!n1){
      mountElement(n2, container, parentComponent);
    } else{
      patchElement(n1, n2, container);
    }
  }

  function patchElement(n1, n2, container){
    console.log('patchElement')
    console.log('n1:',n1)
    console.log('n2:',n2)
  }

  function mountComponent(initinalVNode: any, container, parentComponent) {
    const instance = createComponentInstance(initinalVNode, parentComponent);

    setupComponent(instance);
    setupRenderEffect(instance, initinalVNode, container);
  }

  function mountElement(vnode: any, container: any, parentComponent) {
    const { children, type, props, shapeFlag } = vnode;
    const el = (vnode.el = hostCreateElement(type));

    // string || array
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // text_children
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // array_children
      mountChildren(vnode, el, parentComponent);
    }

    for (const key in props) {
      const val = props[key];

      // console.log(key)
      // 具体 => 通用
      // on + eventName
      hostPatchProp(el, key, val);
    }

    hostInsert(el, container);
    // container.append(el);
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach((v) => {
      patch(null, v, container, parentComponent);
    });
  }

  function setupRenderEffect(instance: any, initinalVNode, container) {
    effect(() => {
      if (!instance.isMounted) {
        console.log("初始化");

        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));
        // vnode -> patch
        // vnode -> element -> mountElement
        patch(null, subTree, container, instance);

        initinalVNode.el = subTree.el;

        instance.isMounted = true;
      } else {
        console.log("更新");

        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;
        instance.subTree = subTree;

        patch(prevSubTree, subTree, container, instance);
      }
    });
  }

  return {
    createApp: createAppAPI(render),
  };
}
