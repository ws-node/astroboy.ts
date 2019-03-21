import { Constructor } from "@bonbons/di";
import { ConfigDefines, InnerBaseCompiler } from "../typings/IConfigCompiler";

export function DefineConfig<T extends ConfigDefines>(options?: T) {
  const { modules = {}, functions = {}, consts = {} } = options || {};
  return function define_config(target: Constructor<any>) {
    const proto: InnerBaseCompiler<any> = target.prototype;
    proto.modules = modules;
    proto.functions = functions;
    proto.consts = consts;
    return target;
  };
}
