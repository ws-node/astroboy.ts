import {
  serializeAs, deserializeAs,
  inheritSerialization, Serialize,
  Deserialize, GenericDeserialize
} from "cerialize";
import { Constructor } from "@bonbons/di";
import { IStaticTypedResolver, IStaticSerializeOptions } from "../typings/IStaticTypeResolver";
import { getPropertyType } from "../utils";

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

/** Bonbons built-in static type contract serialization tool (based on cerialize) */
export const TypedSerializer = new TypedSerializerCreator();

function SerializeDefine();
function SerializeDefine(name: string);
function SerializeDefine<T>(name: string, type: Constructor<T>);
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

function DeserializeDefine();
function DeserializeDefine(name: string);
function DeserializeDefine<T>(name: string, type: Constructor<T>);
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