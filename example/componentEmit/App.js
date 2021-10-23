import { h } from "../../lib/small-vue.esm.js";
import { Foo } from "./Foo.js";

window.self = null;

export const App = {
  // 假设必须要写render
  name: "App",
  render() {
    window.self = this;
    return h("div", {}, [
      h("div", {}, "App"),
      h(Foo, {
        // emit
        // on + Event
        onAdd(a,b){
          console.log('onAdd',a,b)
        },
        onAddFoo(a,b){
          console.log('onAddFoo',a,b)
        }
      }),
    ]);
  },

  setup() {
    return {};
  },
};
