import { inheritSerialization } from "cerialize";
import { Constructor } from "@bonbons/di";
import { IStaticTypedResolver, IStaticSerializeOptions } from "../typings/IStaticTypeResolver";
/**
 * 内建静态类型序列化工具类
 * @description
 * @author Big Mogician
 * @export
 * @class TypedSerializerCreator
 * @implements {IStaticTypedResolver}
 */
export declare class TypedSerializerCreator implements IStaticTypedResolver {
    ToJSON<T = any>(obj: any, options?: Partial<IStaticSerializeOptions<T>>): string;
    FromJSON<T = any>(json: string, type?: Constructor<T>): T;
    ToObject<T = any>(obj: any, options?: Partial<IStaticSerializeOptions<T>>): any;
    FromObject<T>(json: any, type?: Constructor<T>): T;
}
/** 内建静态类型序列化工具 (based on cerialize) */
export declare const TypedSerializer: TypedSerializerCreator;
/**
 * 定义一个静态类型字段的序列化行为
 * @description
 * @author Big Mogician
 */
declare function SerializeDefine(): any;
/**
 * 定义一个静态类型字段的序列化行为
 * * 字段名重映射
 * @description
 * @author Big Mogician
 * @param {string} name 确定字段名称映射
 */
declare function SerializeDefine(name: string): any;
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
declare function SerializeDefine<T>(name: string, type: Constructor<T>): any;
/**
 * 定义一个静态类型字段的序列化行为
 * * 类型重映射
 * @description
 * @author Big Mogician
 * @template T
 * @param {Constructor<T>} type 确定字段的实际类型
 */
declare function SerializeDefine<T>(type: Constructor<T>): any;
/**
 * 定义一个静态类型字段的反序列化行为
 * @description
 * @author Big Mogician
 */
declare function DeserializeDefine(): any;
/**
 * 定义一个静态类型字段的
 * * 字段名重映射
 * @description
 * @author Big Mogician
 * @param {string} name 确定字段名称映射
 */
declare function DeserializeDefine(name: string): any;
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
declare function DeserializeDefine<T>(name: string, type: Constructor<T>): any;
/**
 * 定义一个静态类型字段的反序列化行为
 * * 类型重映射
 * @description
 * @author Big Mogician
 * @template T
 * @param {Constructor<T>} type 确定字段的实际类型
 */
declare function DeserializeDefine<T>(type: Constructor<T>): any;
export { SerializeDefine as Serialize, DeserializeDefine as Deserialize, inheritSerialization as Extends };
