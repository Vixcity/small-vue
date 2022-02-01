// 老的是 text
// 新的是 array

import { ref, h } from "../../lib/small-vue.esm.js";

const prevChildren = "old Children";
const nextChildren = [h("div", {}, "A"), h("div", {}, "B")];

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
