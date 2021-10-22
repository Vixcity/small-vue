import { h } from "../../lib/small-vue.esm.js";

window.self = null 

export const App = {
  // 假设必须要写render
  render() {
    window.self = this
    return h("div", {
        id:'root',
        class:["red",'hard'],
        onClick() {
          console.log('click')
        }
      },
      // setupState
      // this.$el -> get root element
      "h1," + this.msg
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
