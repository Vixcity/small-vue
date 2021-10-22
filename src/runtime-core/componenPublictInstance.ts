import { hasOwn } from "../shared/index";

const publicPorpertiesMap = {
  $el: (i) => i.vnode.el,
};
export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // setupState
    const { setupState, props } = instance;
    // 该函数已经重构成下方函数
    // if (key in setupState) {
    //   return setupState[key];
    // }

    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    const publicGetter = publicPorpertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
