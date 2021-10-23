import { camelize, capitalize } from "../shared/index";

export function emit(instance, event, ...args) {
  console.log("emit:" + event);
  // instance => event
  const { props } = instance;

  // TPP => 先去写一个特定的行为 -> 重构成通用的行为

  // add -> Add
  // add-foo -> AddFoo

  const toHandlerKey = (str:string) => {
    return str ? "on" + capitalize(str) : "";
  };

  const handlerName = toHandlerKey(camelize(event));

  const handler = props[handlerName];
  handler && handler(...args);
}
