// 老的是 text
// 新的是 text

import { ref, h } from "../../lib/small-vue.esm.js";

const prevChildren = "oldChildren";
const nextChildren = "newChildren";

export default {
  name: "TextToText",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;

    return {
      isChange,
    };
  },
  render() {
    const self = this;

    return self.isChange === true
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
