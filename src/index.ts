export * from "./decorators/injectable";
export * from "./decorators/controller";
export * from "./middlewares";
export * from "./services/Context";
export * from "./services/Injector";
export * from "./services/Configs";
export * from "./services/BaseClass";
export * from "./services/AstroboyContext";
export * from "./server";
export * from "./configs";
export * from "./typings/IContext";
export * from "astroboy-router";
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
