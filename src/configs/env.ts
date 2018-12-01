import { createToken } from "../services/Configs";

interface IENV {
  mode: string;
}

export const ENV = createToken<IENV>("ENV");
