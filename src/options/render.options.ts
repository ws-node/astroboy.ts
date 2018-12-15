import { Constructor } from "@bonbons/di";
import { createOptions } from "../services/Configs";
import { NunjunksEngine } from "../plugins/nunjunks/core";
import { IViewEngine } from "../typings/IViewEngine";

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
  }
};

export const RENDER_RESULT_OPTIONS = createOptions<RenderResultOptions>("RENDER_RESULT_OPTIONS");
