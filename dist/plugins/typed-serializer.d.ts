import { inheritSerialization } from "cerialize";
import { Constructor } from "@bonbons/di";
import { IStaticTypedResolver, IStaticSerializeOptions } from "../typings/IStaticTypeResolver";
export declare class TypedSerializerCreator implements IStaticTypedResolver {
    ToJSON<T = any>(obj: any, options?: Partial<IStaticSerializeOptions<T>>): string;
    FromJSON<T = any>(json: string, type?: Constructor<T>): T;
    ToObject<T = any>(obj: any, options?: Partial<IStaticSerializeOptions<T>>): any;
    FromObject<T>(json: any, type?: Constructor<T>): T;
}
/** Bonbons built-in static type contract serialization tool (based on cerialize) */
export declare const TypedSerializer: TypedSerializerCreator;
declare function SerializeDefine(): any;
declare function SerializeDefine(name: string): any;
declare function SerializeDefine<T>(name: string, type: Constructor<T>): any;
declare function SerializeDefine<T>(type: Constructor<T>): any;
declare function DeserializeDefine(): any;
declare function DeserializeDefine(name: string): any;
declare function DeserializeDefine<T>(name: string, type: Constructor<T>): any;
declare function DeserializeDefine<T>(type: Constructor<T>): any;
export { SerializeDefine as Serialize, DeserializeDefine as Deserialize, inheritSerialization as Extends };
