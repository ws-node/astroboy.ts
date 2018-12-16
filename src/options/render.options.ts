import { Constructor } from "@bonbons/di";
import { createOptions } from "../services/Configs";
import { NunjunksEngine } from "../plugins/nunjunks";
import { IViewEngine } from "../typings/IViewEngine";

interface IErrorHandler {
  path: string;
  tplStr: string;
  content: (error: Error) => string;
}

/**
 * ## 配置RenderResult的解析方式
 * @description
 * @author Big Mogician
 * @export
 * @interface RenderResultOptions
 */
export interface RenderResultOptions<T extends string | Symbol = any> {
  astConf: {
    use: boolean;
    configs: any;
  };
  path?: string;
  tplStr?: string;
  state?: any;
  configs?: any;
  engine?: T;
  engines: {
    [prop: string]: Constructor<IViewEngine>;
  };
  onError: Partial<IErrorHandler>;
  onDevError: Partial<IErrorHandler>;
}

export const defaultRenderResultOptions: RenderResultOptions<"nunjunks"> = {
  astConf: {
    use: false,
    configs: undefined
  },
  path: "",
  tplStr: undefined,
  state: undefined,
  configs: undefined,
  engine: "nunjunks",
  engines: {
    nunjunks: NunjunksEngine
  },
  onError: {
    path: undefined,
    tplStr: undefined,
    content: (_) => "Internal Server Error"
  },
  onDevError: {
    path: undefined,
    tplStr: undefined,
    content: (e) => `<h3 style="color: red">${(e.name && `模板渲染错误: ${e.name}`) || "模板渲染错误"}<h3><pre>${e.stack}</pre>`
  }
};

export const RENDER_RESULT_OPTIONS = createOptions<RenderResultOptions>("RENDER_RESULT_OPTIONS");
