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
    const { path, state, ...options } = {
      ...configs.get(RENDER_RESULT_OPTIONS),
      ...this.configs
    };
    return await ctx.render(path, state, options);
  }

}
