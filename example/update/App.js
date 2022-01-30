import { h, ref } from "../../lib/small-vue.esm.js";

export const App = {
  name: "App",

  setup() {
    const count = ref(0);

    const onClick = () => {
      count.value++;
    };

    return {
      count,
      onClick,
    };
  },

  render() {
    return h(
      "div",
      {
        id: "root",
      },
      [
        h("div", {}, "count:" + this.count), // 依赖收集，触发响应式对象的get操作，执行匿名函数
        h(
          "button",
          {
            onClick: this.onClick,
          },
          "click"
        ), // 依赖收集
      ]
    );
  },
};
