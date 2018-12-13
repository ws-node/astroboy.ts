import {
  serializeAs, deserializeAs,
  inheritSerialization, Serialize,
  Deserialize, GenericDeserialize
} from "cerialize";
import { Constructor } from "@bonbons/di";
import { IStaticTypedResolver, IStaticSerializeOptions } from "../typings/IStaticTypeResolver";
import { getPropertyType } from "../utils";

/**
 * 内建静态类型序列化工具类
 * @description
 * @author Big Mogician
 * @export
 * @class TypedSerializerCreator
 * @implements {IStaticTypedResolver}
 */
export class TypedSerializerCreator implements IStaticTypedResolver {

  public ToJSON<T = any>(obj: any, options?: Partial<IStaticSerializeOptions<T>>): string {
    if (options === undefined) options = { format: false };
    return JSON.stringify(Serialize(obj, options.type), null, options.format ? "  " : 0);
  }

  public FromJSON<T = any>(json: string, type?: Constructor<T>): T {
    return !type ?
      Deserialize(JSON.parse(json)) as T :
      GenericDeserialize(JSON.parse(json), type) as T;
  }

  public ToObject<T = any>(obj: any, options?: Partial<IStaticSerializeOptions<T>>): any {
    if (options === undefined) options = { format: false };
    return Serialize(obj, options.type);
  }

  public FromObject<T>(json: any, type?: Constructor<T>): T {
    return !type ?
      Deserialize(json) as T :
      GenericDeserialize(json, type) as T;
  }

}

/** 内建静态类型序列化工具 (based on cerialize) */
export const TypedSerializer = new TypedSerializerCreator();

/**
 * 定义一个静态类型字段的序列化行为
 * @description
 * @author Big Mogician
 */
function SerializeDefine();
/**
 * 定义一个静态类型字段的序列化行为
 * * 字段名重映射
 * @description
 * @author Big Mogician
 * @param {string} name 确定字段名称映射
 */
function SerializeDefine(name: string);
/**
 * 定义一个静态类型字段的序列化行为
 * * 字段名重映射
 * * 类型重映射
 * @description
 * @author Big Mogician
 * @template T
 * @param {string} name 确定字段名称映射
 * @param {Constructor<T>} type 确定字段的实际类型
 */
function SerializeDefine<T>(name: string, type: Constructor<T>);
/**
 * 定义一个静态类型字段的序列化行为
 * * 类型重映射
 * @description
 * @author Big Mogician
 * @template T
 * @param {Constructor<T>} type 确定字段的实际类型
 */
function SerializeDefine<T>(type: Constructor<T>);
function SerializeDefine(...args: any[]) {
  return function serialize_define<M>(target: M, propKey: string, descriptor?: PropertyDescriptor) {
    const type = getPropertyType(target, propKey);
    const [r1, r2] = args;
    if (!r1) {
      serializeAs(propKey)(target, propKey, descriptor);
    } else if (typeof r1 !== "string") {
      serializeAs(r1, propKey)(target, propKey, descriptor);
    } else if (!r2) {
      serializeAs(r1)(target, propKey, descriptor);
    } else {
      serializeAs(r2 || type, r1)(target, propKey, descriptor);
    }
  };
}

/**
 * 定义一个静态类型字段的反序列化行为
 * @description
 * @author Big Mogician
 */
function DeserializeDefine();
/**
 * 定义一个静态类型字段的
 * * 字段名重映射
 * @description
 * @author Big Mogician
 * @param {string} name 确定字段名称映射
 */
function DeserializeDefine(name: string);
/**
 * 定义一个静态类型字段的反序列化行为
 * * 字段名重映射
 * * 类型重映射
 * @description
 * @author Big Mogician
 * @template T
 * @param {string} name 确定字段名称映射
 * @param {Constructor<T>} type 确定字段的实际类型
 */
function DeserializeDefine<T>(name: string, type: Constructor<T>);
/**
 * 定义一个静态类型字段的反序列化行为
 * * 类型重映射
 * @description
 * @author Big Mogician
 * @template T
 * @param {Constructor<T>} type 确定字段的实际类型
 */
function DeserializeDefine<T>(type: Constructor<T>);
function DeserializeDefine(...args: any[]) {
  return function deserialize_define<M>(target: M, propKey: string, descriptor?: PropertyDescriptor) {
    const type = getPropertyType(target, propKey);
    const [r1, r2] = args;
    if (!r1) {
      deserializeAs(type || String, propKey)(target, propKey, descriptor);
    } else if (typeof r1 !== "string") {
      deserializeAs(r1, propKey)(target, propKey, descriptor);
    } else if (!r2) {
      deserializeAs(type || String, r1)(target, propKey, descriptor);
    } else {
      deserializeAs(r2 || type || String, r1)(target, propKey, descriptor);
    }
  };
}

export {
  SerializeDefine as Serialize,
  DeserializeDefine as Deserialize,
  inheritSerialization as Extends
};