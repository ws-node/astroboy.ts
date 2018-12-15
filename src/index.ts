import Astroboy from "astroboy";
import { ControllerConstructor } from "astroboy-router/dist/metadata";
import { createRouter } from "astroboy-router";
import { GlobalImplements } from "./utils";
import { copyPrototype } from "./decorators/controller";
import { initRouters } from "./builders";

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
  const sourceCtor = GlobalImplements.get(ctor);
  const result = createRouter(sourceCtor, name, root);
  copyPrototype(<any>ctor, sourceCtor);
  return result;
}

interface IPreProcess {
  /** 是否自动生成2.0的routers，默认：`false` */
  enabled: boolean;
  /** 是否强制刷新2.0的routers，默认：`false` */
  always: boolean;
  /** 整个项目的url前缀，默认：`'/'` */
  appRoot: string;
  /** 生成router文件的文件类型，默认：`'js'` */
  fileType: "js" | "ts";
}

/**
 * ## astroboy.ts 预处理函数
 * * 硬核初始化routers
 * @description
 * @author Big Mogician
 * @export
 * @param {Partial<IPreProcess>} {
 *   routerAutoBuild: open = defaultEnv.routerAutoBuild,
 *   routerAlwaysBuild: always = defaultEnv.routerAlwaysBuild,
 *   routerRoot: root = defaultEnv.routerRoot
 * }
 */
export function preInitFn(configs: Partial<IPreProcess>): void;
export function preInitFn(configs: Partial<IPreProcess>, inEnd?) {
  return initRouters(configs, inEnd);
}


export * from "astroboy-router";
export * from "./decorators";
export * from "./middlewares";
export * from "./services/Injector";
export * from "./services/Context";
export * from "./services/BaseClass";
export * from "./services/AstroboyContext";
export * from "./services/Render";
export * from "./server";
export * from "./configs";
export * from "./options";
export * from "./typings/IContext";
export * from "./typings/IResult";
export * from "./typings/IViewEngine";
export * from "./typings/IStaticTypeResolver";
export * from "./results/json";
export * from "./results/render";
export * from "./plugins/typed-serializer";

export {
  Configs,
  ConfigToken,
  ConfigEntry,
  createOptions,
  createConfig,
  TokenGenerator,
  InjectScope
} from "./services/Configs";

export {
  Astroboy
};
