// 响应式库
// const { effect } = require("@vue/reactivity");

// 依赖
let currentEffect;
class Dep {
    constructor(val) {
        // es6+
        this.effects = new Set();
        this._val = val
    }

    get value(){
        this.depend()
        return this._val
    }

    set value(newValue){ 
        this._val = newValue
        this.notice()
    }

    // 1. 收集依赖
    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect)
        }
    }

    // 2. 触发依赖
    notice() {
        // 触发一下我们之前收集到的依赖
        this.effects.forEach((effect) => {
            effect()
        })
    }
}

export function effectWatch(effect) {
    // 收集依赖
    currentEffect = effect;
    effect()
    currentEffect = null;
}

// const dep = new Dep(10);

// let b;

// effectWatch(() => {
//     b = dep.value + 10
//     console.log(b);
// });

// 值发生变更
// dep.value = 20

// reactive
// dep -> number or string
// obj -> key -> dep
// 怎么实现
// 1. 要知道对象是什么时候改变的
// obj.a -> get 
// obj.a = 2 -> set

// vue2
// proxy
// vue3
const targetMap = new Map()
function getDep(target,key) { 
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap);
    }
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Dep();
        depsMap.set(key,dep);
    }
    return dep
}

export function reactive (raw) { 
    return new Proxy(raw,{
        get(target,key){
            // key ==> def 一个key对应一个dep
            // dep 我们存储在哪里
            const dep = getDep(target,key);

            // 依赖收集
            dep.depend();

            // return target[key] === return Reflect.get(target,key) 
            return Reflect.get(target,key);
        },
        set(target,key,value){
            // 触发依赖
            // 要获取到dep对象
            const dep = getDep(target,key);
            const result = Reflect.set(target,key,value);
            dep.notice();
            return result
        }
    })
}

// const user = reactive({
//     age:19
// })

// let double;

// effectWatch(() => {
//     console.log("-------reactive------")
//     double = user.age    
//     console.log(double)
// })

// user.age = 20