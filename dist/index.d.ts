export * from "@bonbons/di";
export * from "astroboy-router";
export * from "./decorators/injectable";
export * from "./decorators/controller";
export * from "./middlewares";
export * from "./services/Injector";
export * from "./services/Context";
export * from "./services/BaseClass";
export * from "./services/AstroboyContext";
export * from "./server";
export * from "./configs";
export * from "./typings/IContext";
export * from "./typings/IResult";
export * from "./results/json";
import Astroboy from "astroboy";
import { Configs, createOptions, createConfig } from "./services/Configs";
import { ControllerConstructor } from "astroboy-router/dist/metadata";
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
export declare function buildRouter<T>(ctor: ControllerConstructor<T>, name: string, root: string): (string | string[])[][];
export { Astroboy, Configs, createOptions, createConfig };
