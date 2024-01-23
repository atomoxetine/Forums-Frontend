declare global {
  interface FormData {
    toJSO(): { [key: string]: any };
    toJSON(): string;
  }
}

FormData.prototype.toJSO = function () {
  const object: { [key: string]: FormDataEntryValue | FormDataEntryValue[] } = {};
  this.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key] as FormDataEntryValue];
    }
    (object[key] as FormDataEntryValue[]).push(value);
  });
  return object;
};

FormData.prototype.toJSON = function () {
  return JSON.stringify(this.toJSO());
};

export {};