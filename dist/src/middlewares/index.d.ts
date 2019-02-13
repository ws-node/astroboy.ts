import { IContext } from "../typings/IContext";
/**
 * ## astroboy.ts初始化中间件
 * * 请确保此中间件的优先级足够高
 * * 建议优先级<1
 * @param ctx IContext
 * @param next 下一个中间件
 */
export declare const serverInit: (ctx: IContext, next: () => Promise<void>) => Promise<void>;
export { createMiddleware as injectScope, IMiddlewaresScope } from "./core";
