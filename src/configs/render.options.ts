import { createOptions } from "../services/Configs";

/**
 * ## 配置RenderResult的解析方式
 * @description
 * @author Big Mogician
 * @export
 * @interface RenderResultOptions
 */
export interface RenderResultOptions {
  path: string;
  state?: any;
  viewEngine?: string;
}

export const defaultRenderResultOptions: RenderResultOptions = {
  path: "",
  state: undefined,
  viewEngine: undefined,
};

export const RENDER_RESULT_OPTIONS = createOptions<RenderResultOptions>("RENDER_RESULT_OPTIONS");
