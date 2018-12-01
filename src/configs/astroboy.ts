import { createToken } from "../services/Configs";

interface IAstroboyBase {
  app: any;
  config: any;
}

/** astroboy的基础配置，app和config */
export const AST_BASE = createToken<IAstroboyBase>("AstroboyBase");
