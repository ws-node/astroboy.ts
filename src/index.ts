import Astroboy from "astroboy";
import { ControllerConstructor } from "astroboy-router/dist/metadata";
import { createRouter } from "astroboy-router";
import { GlobalImplements } from "./utils";

/**
 * ## 构建路由
 * * 等效astroboy-router的createRouter方法
 * @description
 * @author Big Mogician
 * @export
 * @template T
 * @param {ControllerConstructor<T>} ctor
 * @param {string} name
 * @param {string} root
 * @returns
 */
export function buildRouter<T>(ctor: ControllerConstructor<T>, name: string, root: string) {
  return createRouter(GlobalImplements.get(ctor), name, root);
}

export * from "@bonbons/di";
export * from "astroboy-router";
export * from "./decorators";
export * from "./middlewares";
export * from "./services/Injector";
export * from "./services/Context";
export * from "./services/BaseClass";
export * from "./services/AstroboyContext";
export * from "./server";
export * from "./configs";
export * from "./typings/IContext";
export * from "./typings/IResult";
export * from "./typings/IStaticTypeResolver";
export * from "./results/json";
export { Configs, createOptions, createConfig } from "./services/Configs";

export {
  Astroboy
};
