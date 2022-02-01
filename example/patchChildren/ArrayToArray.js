// 老的是 array
// 新的是 text

import { ref, h } from "../../lib/small-vue.esm.js";

const prevChildren = [h("div", {}, "A"), h("div", {}, "B")];
const nextChildren = "newChildren";

export default {
  name: "ArrayToText",
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
