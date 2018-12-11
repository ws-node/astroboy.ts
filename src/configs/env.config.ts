import { createConfig } from "../services/Configs";

export interface InnerENV extends IENV {
  ctorFolder: string;
  routerFolder: string;
}

export interface IENV {
  /** 是否打印astroboy.ts的记录日志，默认：`false` */
  showTrace: boolean;
  /** 设置DI解析的模式，默认：`'native'` */
  diType: "native" | "proxy";
  /** 是否自动生成2.0routers，默认：`` */
  routerAutoBuild: boolean;
  routerAlwaysBuild: boolean;
  routerRoot: string;
}

export const defaultEnv: InnerENV = {
  showTrace: false,
  diType: "native",
  routerAutoBuild: true,
  routerAlwaysBuild: false,
  ctorFolder: "app/controllers",
  routerFolder: "app/routers",
  routerRoot: "/"
};

/** astroboy.ts环境变量 */
export const ENV = createConfig<IENV>("@astroboy.ts");
