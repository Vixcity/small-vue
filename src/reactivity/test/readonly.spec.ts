import { readonly, isReadonly, isProxy } from "../reactive";
describe("readonly", () => {
  it("happy path", () => {
    // not set 不可以被改写
    const original = { foo: 1, bar: { bar: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(isReadonly(wrapped)).toBe(true);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(wrapped.bar)).toBe(true);
    expect(isReadonly(original.bar)).toBe(false);
    expect(isProxy(wrapped)).toBe(true);

    expect(wrapped.foo).toBe(1);
  });

  it("should call console.warn when set", () => {
    // console.warn
    // mock
    console.warn = jest.fn();

    const user = readonly({
      age: 10,
    });
    user.age = 11;
    expect(console.warn).toBeCalled();
  });
});
