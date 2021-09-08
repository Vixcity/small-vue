// vDom -> Dom

export function mountElement(vnode, container) {
  // 通过
  const { tag, props, children } = vnode;
  // tag
  const el = document.createElement(tag);

  // props
  if (props) {
    for (const key in props) {
      const val = props[key];
      el.setAttribute(key, val);
    }
  }

  // children
  // 1.可以接受一个字符串类型
  if (typeof children === "string") {
    const textNode = document.createTextNode(children);
    el.append(textNode);
  } else if (Array.isArray(children)) {
    // 2.可以接受一个数组
    children.forEach((v) => {
      mountElement(v, el);
    });
  }
  // 插入
  container.append(el);
}
