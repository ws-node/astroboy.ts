import { createToken } from "../services/Configs";

interface IENV {
  mode: string;
}

/** node env环境变量 */
export const ENV = createToken<IENV>("ENV");
