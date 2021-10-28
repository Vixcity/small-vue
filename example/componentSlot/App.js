import { h,createTextVNode } from "../../lib/small-vue.esm.js";
import { Foo } from "./Foo.js";

window.self = null;

export const App = {
  // 假设必须要写render
  name: "App",
  render() {
    const app = h("div", {}, "App");
    // object key
    const foo = h(
      Foo,
      {},
      {
        // element -> 标签类型
        header: ({ age }) => [
          h("p", {}, "header" + age),
          createTextVNode("你好呀"),
        ],
        footer: () => h("p", {}, "footer"),
      }
    );
    // 数组和VNode
    // const foo = h(Foo, {}, h("p", {}, "123"));

    return h("div", {}, [app, foo]);
  },

  setup() {
    return {};
  },
};
