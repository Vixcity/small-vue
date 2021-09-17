import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  private _rawValue: any;
  public dep;
  public __v__isRef = true;

  constructor(value) {
    this._rawValue = value;
    // 如果ref是对象的话，我们需要把ref => reactive 包裹之后的结果
    this._value = convent(value);

    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    // 检查 newValue 和 this._value 是否改变
    if (hasChanged(this._rawValue, newValue)) {
      // 如果改变了，就先去修改value的值，再去进行通知
      this._rawValue = newValue;
      this._value = convent(newValue);
      triggerEffects(this.dep);
    }
  }
}

function convent(value) {
  return isObject(value) ? reactive(value) : value;
}

export function ref(value) {
  return new RefImpl(value);
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function isRef(ref) {
  return !!ref.__v__isRef;
}

export function unRef(ref) {
  // 看看是不是一个ref对象？ref.value：value
  return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objectWithRefs){
    return new Proxy(objectWithRefs,{
        get(target,key){
             return unRef(Reflect.get(target,key))
        },
        set(target,key,value){
            if(isRef(target[key]) && !isRef(value)){
                return target[key].value = value
            } else {
                return Reflect.set(target,key,value)
            }
        }
    })
}