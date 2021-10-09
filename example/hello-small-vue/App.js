import { h } from "../../lib/small-vue.esm.js";

export const App = {
  // 假设必须要写render
  render() {
    return h("div", {
        id:'root',
        class:["red",'hard']
      },
      // "h1," + this.msg
      // string
      // "hi,small-vue"
      
      // Array
      [h('p',{class:"red"},'hi'),h('p',{class:'blue'},'small-vue')]
    );
  },

  setup() {
    return {
      msg: "small-vue",
    };
  },
};
