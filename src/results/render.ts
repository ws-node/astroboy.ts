import merge from "lodash/merge";
import { IResult, IResultScope } from "../typings/IResult";
import { RenderResultOptions, RENDER_RESULT_OPTIONS } from "../options";
import { Context } from "../services/Context";

export class RenderResult implements IResult {

  private configs!: Partial<RenderResultOptions>;

  constructor(value: string | Partial<RenderResultOptions>) {
    this.configs = typeof value === "string" ? { path: value } : value;
  }

  async toResult({ injector, configs }: IResultScope): Promise<string> {
    const { ctx } = injector.get(Context);
    const {
      path,
      tplStr,
      state,
      engines,
      astConf,
      engine: key,
      configs: confs,
    } = merge(<RenderResultOptions>{}, configs.get(RENDER_RESULT_OPTIONS) || {}, this.configs || {});
    if (astConf && !!astConf.use) {
      return await ctx.render(path, state, astConf.configs);
    }
    const engine = injector.get(engines[key]);
    return !tplStr ?
      await engine.render(path, confs) :
      await engine.renderString(tplStr, confs);
  }

}
