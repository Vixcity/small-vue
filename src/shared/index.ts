export const extend = Object.assign;

export const EMPTY_OBJECT = {}

export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

export const hasChanged = (value, newValue) => {
  return !Object.is(value, newValue);
};

export const isOn = (key: string) => /^on[A-Z]/.test(key);

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key);

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : "";
  });
};
