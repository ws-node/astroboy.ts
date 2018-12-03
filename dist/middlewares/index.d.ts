import { IContext } from "../typings/IContext";
import { InjectService } from "../services/Injector";
import { Configs } from "../services/Configs";
export interface IMiddlewaresScope<T = IContext> {
    injector: InjectService;
    configs: Configs;
    ctx: T;
    next: () => Promise<void>;
    args: any[];
}
/**
 * 创建具有依赖注入能力的中间件
 * @description
 * @author Big Mogician
 * @export
 * @template T extends IContext
 * @param {((bunddle: IMiddlewaresScope, ctx: T, next: () => Promise<void>) => void | Promise<void>)} middleware
 * @param {...any[]} args
 * @returns
 */
declare function createMiddleware<T extends IContext = IContext>(middleware: (bunddle: IMiddlewaresScope<T>) => void | Promise<void>, ...args: any[]): (ctx: T, next: () => Promise<void>) => Promise<void>;
/**
 * ## astroboy.ts初始化中间件
 * * 请确保此中间件的优先级足够高
 * * 建议优先级<1
 * @param ctx IContext
 * @param next 下一个中间件
 */
export declare const serverInit: (ctx: IContext, next: () => Promise<void>) => Promise<void>;
export { createMiddleware as injectScope };
