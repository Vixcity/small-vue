// const { effect, reactive } = require('@vue/reactivity')
// const { effectWatch, reactive } = require('./core/reactivity/index')
import { effectWatch, reactive } from "./core/reactivity/index.js";

// reactivity 响应式实现 v1
// let a = 10
// let b = a + 10
// console.log(b)

// a = 20
// b = a + 10
// console.log(b)

// reactivity 响应式实现 v2
// let a = 10
// let b
// update()
// function update() {
//     b = a + 10
//     console.log(b)
// }

// a = 20
// update()

// reactivity 响应式实现 v3
// 当a发生变更了，让b自动执行update

// 声明一个响应式对象
let a = reactive({
  value: 10,
});

let b;

effectWatch(() => {
  // 函数
  // 一上来会执行一下
  b = a.value + 10;
  console.log(b);
});

// a 响应式对象的值发生改变之后会在执行一下
a.value = 20;
