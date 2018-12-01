import { createToken } from "../services/Configs";

interface IENV {
  /** 是否打印astroboy.ts的记录日志 */
  showTrace: boolean;
}

export const defaultEnv: IENV = {
  showTrace: false
};

/** node env环境变量 */
export const ENV = createToken<IENV>("ENV");
