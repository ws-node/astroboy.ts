import { IStaticTypedResolver, IStaticSerializeOptions } from "../../typings/IStaticTypeResolver";
import { Constructor } from "@bonbons/di";
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
