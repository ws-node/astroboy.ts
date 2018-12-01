/// <reference types="koa" />
/// <reference types="koa-router" />
import { IContext } from "../typings/IContext";
import { Context } from "./Context";
/**
 * ## Astroboy.ts基础上下文服务
 * * `ctx` 承载Koa.Context
 * * `app` 承载Koa.Application
 * * `config` 承载业务config
 * @description
 * @author Big Mogician
 * @export
 * @class AstroboyContext
 * @template T
 */
export declare class AstroboyContext<T extends Partial<IContext> = {}> {
    context: Context<T>;
    /** BaseClass.ctx */
    readonly ctx: IContext & T;
    /** BaseClass.app */
    readonly app: import("pplicatio");
    /** BaseClass.config */
    readonly config: any;
    constructor(context: Context<T>);
    getConfig(...args: any[]): any;
    getServiceClass(...args: any[]): any;
    getService(...args: any[]): any;
    callService(...args: any[]): any;
    invokeServiceMethod(...args: any[]): any;
    getLib(...args: any[]): any;
}
