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
export declare const defaultRenderResultOptions: RenderResultOptions;
export declare const RENDER_RESULT_OPTIONS: import("../services/Configs").ConfigToken<RenderResultOptions>;
