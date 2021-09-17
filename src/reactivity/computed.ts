import { ReactiveEffect } from "./effect";

class ComputedRefImp {
  private _getter: any;
  private _dirty: boolean = true;
  private _value: any;
  private _effect: any;

  constructor(getter) {
    this._getter = getter;

    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) { 
        this._dirty = true;
      }
    });
  }

  get value() {
    // get 调用完一次之后，给他锁上
    // get value -> dirty true
    // 当依赖的响应式对象的值发生改变的时候
    // effect
    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }

    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImp(getter);
}
