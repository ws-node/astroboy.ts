import { createToken } from "../services/Configs";

interface IAstroboyBase {
  app: any;
  config: any;
}

export const AST_BASE = createToken<IAstroboyBase>("AstroboyBase");
