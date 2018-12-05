import { createConfig } from "../services/Configs";

interface IENV {
  /** 是否打印astroboy.ts的记录日志 */
  showTrace: boolean;
  diType: "native" | "proxy";
}

export const defaultEnv: IENV = {
  showTrace: false,
  diType: "native"
};

/** astroboy.ts环境变量 */
export const ENV = createConfig<IENV>("@astroboy.ts");
