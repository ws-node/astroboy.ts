import Koa from "koa";
import { IContext } from "../typings/IContext";
import { Context } from "./Context";
/**
 * ## Astroboy.ts基础上下文服务
 * * `ctx` 承载Koa.Context，可定制类型
 * * `app` 承载Koa.Application，可定制类型
 * * `config` 承载业务config，可定制类型
 * @description
 * @author Big Mogician
 * @export
 * @class AstroboyContext
 * @template T typeof `ctx` 类型
 * @template A typeof `app` 类型
 * @template C typeof `config` 类型
 */
export declare class AstroboyContext<T = IContext, A = Koa, C = any> {
    protected context: Context<T>;
    /** BaseClass.ctx */
    readonly ctx: T;
    /** BaseClass.app */
    readonly app: A;
    /** BaseClass.config */
    readonly config: C;
    constructor(context: Context<T>);
    getConfig(...args: any[]): any;
    getServiceClass(...args: any[]): any;
    getService(...args: any[]): any;
    callService(...args: any[]): any;
    invokeServiceMethod(...args: any[]): any;
    getLib(...args: any[]): any;
}
