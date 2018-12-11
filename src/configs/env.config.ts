import { createConfig } from "../services/Configs";

interface IENV {
  /** 是否打印astroboy.ts的记录日志，默认：`false` */
  showTrace: boolean;
  /** 设置DI解析的模式，默认：`'native'` */
  diType: "native" | "proxy";
}

export const defaultEnv: IENV = {
  showTrace: false,
  diType: "native"
};

/** astroboy.ts环境变量 */
export const ENV = createConfig<IENV>("@astroboy.ts");
