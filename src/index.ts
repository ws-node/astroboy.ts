import { IControllerConstructor } from "astroboy-router/metadata";
import { createRouter } from "astroboy-router";
// import { GlobalImplements } from "./utils";
// import { copyPrototype } from "./decorators/controller";

const Astroboy = require("astroboy");

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
export function buildRouter<T>(
  ctor: IControllerConstructor<T>,
  name: string,
  root: string
) {
  // const sourceCtor = GlobalImplements.get(ctor);
  const result = createRouter(ctor, name, root);
  // copyPrototype(<any>ctor, sourceCtor);
  return result;
}

// export * from "astroboy-router";
export * from "./decorators";
export * from "./middlewares";
export * from "./services/Injector";
export * from "./services/Context";
export * from "./services/BaseClass";
export * from "./services/AstroboyContext";
export * from "./services/Render";
export * from "./services/ConfigReader";
export * from "./server";
export * from "./configs";
export * from "./typings/IConfigs";
export * from "./typings/IContext";
export * from "./typings/IResult";
export * from "./typings/IViewEngine";
export * from "./typings/IConfigCompiler";
export * from "./typings/IStaticTypeResolver";
export * from "./results/json";
export * from "./results/render";

export { Bundles } from "./bundle";

export {
  TypedSerializer,
  Serialize,
  Deserialize,
  Extends
} from "./plugins/typed-serializer";
export { NUNJUNKS_OPTIONS } from "./plugins/nunjunks";
export { SIMPLE_LOGGER_OPTIONS } from "./plugins/simple-logger";

export { Configs, InjectScope } from "./services/Configs";

export {
  GLOBAL_ERROR,
  JSON_RESULT_OPTIONS,
  RENDER_RESULT_OPTIONS,
  STATIC_RESOLVER,
  JsonResultOptions,
  RenderResultOptions
} from "./options";

export { Astroboy };
