export const extend = Object.assign;
export const isObject = (val) => {
  return val !== null && typeof val === "object";
};
export const hasChanged = (value, newValue) => {
  return !Object.is(value, newValue);
};

export const isOn = (key: string) => /^on[A-Z]/.test(key);

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key);
