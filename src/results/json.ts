import camel from "camelcase";
import reduce from "lodash/reduce";
import isPlainObject from "lodash/isPlainObject";
import { IResult, IResultScope } from "../typings/IResult";
import { JsonResultOptions, JSON_RESULT_OPTIONS } from "../configs/json";

export class JsonResult implements IResult {

  constructor(private value: any, private configs?: Partial<JsonResultOptions>) { }

  /**
   * ### 将json对象序列化写入body
   * * @框架调用方法，请勿手动调用
   * @description
   * @author Big Mogician
   * @param {IResultScope} { configs }
   * @returns {string}
   * @memberof JsonResult
   */
  toResult({ configs }: IResultScope): string {
    const { format, whiteSpace: b, keyResolver: r } = {
      ...configs.get(JSON_RESULT_OPTIONS),
      ...this.configs
    };
    return JSON.stringify(
      !r ? (this.value || {}) : resolveKeys(r, this.value || {}),
      null,
      decideWhiteSpace(format, b)
    );
  }

}

function decideWhiteSpace(format: boolean, b: 0 | 1 | 2 | 4) {
  if (!format) return "";
  switch (b) {
    case 4: return "    ";
    case 2: return "  ";
    case 1: return " ";
    case 0: return "";
    default: return "";
  }
}

function resolveKeys(resolver: (k: string) => string, value: any, deep = true) {
  let res: any;
  if (Array.isArray(value) && value.length > 0) {
    res = [];
  } else if (isPlainObject(value) && Object.keys(value).length > 0) {
    res = {};
  } else {
    return value;
  }
  return reduce(value, (result, val, key) => {
    if (deep) { val = resolveKeys(resolver, val); }
    const newKey = typeof key === "string" ? resolver(key) : key;
    result[newKey] = val;
    return result;
  }, res);
}

function camelCase(key: string) {
  return camel(key);
}

export const JsonResolvers = {
  camelcase: camelCase
};