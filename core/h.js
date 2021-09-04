// 创建一个虚拟节点
// VDOM

export function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}
