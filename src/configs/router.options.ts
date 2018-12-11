import { createOptions } from "../services/Configs";

export interface InnerRouterOptions extends RouterOptions {
  ctorFolder: string;
  routerFolder: string;
}

export interface RouterOptions {
  /** 是否自动生成2.0的routers，默认：`false` */
  routerAutoBuild: boolean;
  /** 是否强制刷新2.0的routers，默认：`false` */
  routerAlwaysBuild: boolean;
  /** 整个项目的url前缀，默认：`'/'` */
  routerRoot: string;
  /** 生成router文件的文件类型，默认：`'js'` */
  fileType: "js" | "ts";
}

export const defaultRouterOptions: InnerRouterOptions = {
  routerAutoBuild: false,
  routerAlwaysBuild: false,
  ctorFolder: "app/controllers",
  routerFolder: "app/routers",
  routerRoot: "/",
  fileType: "js"
};

export const ROUTER_OPTIONS = createOptions<RouterOptions>("ROUTER_OPTIONS");
