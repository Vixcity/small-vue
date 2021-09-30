import { h } from "../../lib/small-vue.esm.js";

export const App = {
  // 假设必须要写render
  render() {
    return h("div", "h1," + this.msg);
  },

  setup() {
    return {
      msg: "small-vue",
    };
  },
};
