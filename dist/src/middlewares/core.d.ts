import { IContext } from "../typings/IContext";
import { InjectService } from "../services/Injector";
import { Configs } from "../services/Configs";
export interface IMiddlewaresScope<T = IContext> {
    injector: InjectService;
    configs: Configs;
    ctx: T;
    next: () => Promise<void>;
}
declare type ProvideInvoker<T extends IContext = IContext> = (bunddle: IMiddlewaresScope<T>) => void | Promise<void>;
/**
 * 创建具有依赖注入能力的中间件
 *
 * @author Big Mogician
 * @export
 * @template T extends IContext
 * @param {((bunddle: IMiddlewaresScope, ctx: T, next: () => Promise<void>) => void | Promise<void>)} middleware
 * @returns
 */
export declare function createMiddleware<T extends IContext = IContext>(middleware: ProvideInvoker<T>): (ctx: T, next: () => Promise<void>) => Promise<void>;
export {};
