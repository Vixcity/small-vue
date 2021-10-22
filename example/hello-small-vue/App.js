import { h } from "../../lib/small-vue.esm.js";
import { Foo } from "../hello-small-vue/Foo.js";

window.self = null;

export const App = {
  // 假设必须要写render
  name:'App',
  render() {
    window.self = this;
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
        onClick() {
          console.log("click");
        },
      },
      [
        h("div", {}, "hi" + this.msg),
        h(Foo, {
          count: 1,
        }),
      ]
      // setupState
      // this.$el -> get root element
      // "h1," + this.msg
      // string
      // "hi,small-vue"

      // Array
      // [h('p',{class:"red"},'hi'),h('p',{class:'blue'},'small-vue')]
    );
  },

  setup() {
    return {
      msg: "small-vue,Vixcity",
    };
  },
};
