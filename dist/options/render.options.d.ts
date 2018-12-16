import { Constructor } from "@bonbons/di";
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
export declare const defaultRenderResultOptions: RenderResultOptions<"nunjunks">;
export declare const RENDER_RESULT_OPTIONS: import("../services/Configs").ConfigToken<RenderResultOptions<any>>;
export {};
