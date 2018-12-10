import { createConfig } from "../services/Configs";

export interface IENV {
  /** 是否打印astroboy.ts的记录日志 */
  showTrace: boolean;
  diType: "native" | "proxy";
  routerAutoBuild: boolean;
  ctorFolder: string;
  routerFolder: string;
  routerRoot: string;
}

export const defaultEnv: IENV = {
  showTrace: false,
  diType: "native",
  routerAutoBuild: true,
  ctorFolder: "app/controllers",
  routerFolder: "app/routers",
  routerRoot: ""
};

/** astroboy.ts环境变量 */
export const ENV = createConfig<IENV>("@astroboy.ts");
