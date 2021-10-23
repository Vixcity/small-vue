import { h, renderSlots } from "../../lib/small-vue.esm.js";
export const Foo = {
  setup() {
    return;
  },

  render() {
    const foo = h("p", {}, "Foo");

    // foo.vnode.children
    console.log(this.$slots);
    // 把外部的内容，在内部显示，这就是插槽的最核心的内容

    // children -> vnode
    // renderSlots
    // 具名插槽
    // 1.获取到要渲染的元素
    // 2.获取到渲染的位置
    // 作用域插槽
    const age = 18;

    return h("div", {}, [
      renderSlots(this.$slots, "header", { age }),
      foo,
      renderSlots(this.$slots, "footer"),
    ]);
  },
};
