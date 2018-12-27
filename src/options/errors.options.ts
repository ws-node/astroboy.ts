import { createOptions, Configs } from "../services/Configs";
import { InjectService } from "../services/Injector";
import { RenderResult } from "../results/render";
import { RENDER_RESULT_OPTIONS } from "./render.options";
import { ENV } from "../configs/env.config";
import { Context } from "../services/Context";
import { Render } from "../services/Render";
import { SimpleLogger } from "../plugins/simple-logger";

interface IGlobalErrorHandler {
  handler?: (error: any, injector: InjectService, configs: Configs) => void;
}

export const defaultGlobalError: IGlobalErrorHandler = {
  handler: async (error, injector, configs) => {
    const render = injector.get(Render);
    const { ctx } = injector.get(Context);
    const { env } = configs.get(ENV);
    const { onError, onDevError } = configs.get(RENDER_RESULT_OPTIONS);
    const { content: defaultRender, ...args } = env === "production" ? onError : onDevError;
    render.setView("__viewError", error);
    try {
      const result = new RenderResult(args);
      ctx.body = await result.toResult({ injector, configs });
    } catch (_) {
      const logger = injector.get(SimpleLogger);
      logger.trace("GLOBAL_ERROR render failed", _);
      ctx.body = defaultRender(error);
    }
  }
};

export const GLOBAL_ERROR = createOptions<IGlobalErrorHandler>("GLOBAL_ERROR");
