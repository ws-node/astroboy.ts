import merge from "lodash/merge";
import { IResult, IResultScope } from "../typings/IResult";
import { Context } from "../services/Context";
import { SimpleLogger } from "../plugins/simple-logger";
import { ENV } from "../configs/env.config";
import { IContext } from "../typings/IContext";
import { Render } from "../services/Render";
import {
  RenderResultOptions,
  RENDER_RESULT_OPTIONS
} from "../options/render.options";

/**
 * ## Body渲染约定的实现
 * * 按照约定将模板渲染到body相应中
 * @description
 * @author Big Mogician
 * @export
 * @class RenderResult
 * @implements {IResult}
 */
export class RenderResult implements IResult {
  private configs!: Partial<RenderResultOptions>;

  constructor(value: string | Partial<RenderResultOptions>) {
    this.configs = typeof value === "string" ? { path: value } : value;
  }

  /** 框架调用，请勿手动调用 */
  async toResult({ injector, configs }: IResultScope): Promise<string> {
    const { ctx } = injector.get(Context);
    const opts = merge(
      <RenderResultOptions>{},
      configs.get(RENDER_RESULT_OPTIONS) || {},
      this.configs || {}
    );
    const {
      root,
      path: xpath,
      tplStr,
      engines,
      astConf,
      engine: key,
      configs: confs
    } = opts;
    if (astConf && !!astConf.use) {
      return await ctx.render(xpath, astConf.state, astConf.configs);
    }
    const engine = injector.get(engines[key]);
    const path = !root ? xpath : `${root}/${xpath}`;
    try {
      return !tplStr
        ? await engine.render(path, confs)
        : await engine.renderString(tplStr, confs);
    } catch (e) {
      const logger = injector.get(SimpleLogger);
      const render = injector.get(Render);
      const { ctx } = injector.get<Context<IContext>>(Context);
      const { env } = configs.get(ENV);
      const errroTitle =
        (e.name && `模板渲染错误: ${e.name}`) || "模板渲染错误";
      render.setView("__viewError", e);
      logger.debug(errroTitle, e);
      ctx.status = 500;
      const { path: errorPath, tplStr: errorTpl, content } =
        env === "production" ? opts.onError : opts.onDevError;
      if (errorPath) return await engine.render(errorPath, confs);
      if (errorTpl) return await engine.renderString(errorTpl, confs);
      return (content && content(e)) || "Internal Server Error";
    }
  }
}
