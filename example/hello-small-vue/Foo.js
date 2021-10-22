import { h } from "../../lib/small-vue.esm.js";
export const Foo = {
  setup(props) {
    // props.count
    console.log(props);

    // props => shallow readonly
    props.count++;
    console.log(props);
  },
  render() {
    return h("div", {}, "foo:" + this.count);
  },
};
