import { Constructor } from "@bonbons/di";
import { inheritSerialization } from "cerialize";
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
