import { Injectable, Context, AstroboyContext, Configs } from "../../src";

@Injectable()
class T08Service {

  constructor(
    public context: Context,
    public configs: Configs,
    public base: AstroboyContext) { }

}

export = T08Service;