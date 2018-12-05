/// <reference types="koa-router" />
import Koa from "koa";
/**
 * ## 基础astroboy类
 * * 不建议在astroboy.ts的体系中使用
 * * 完整功能替代：AstroboyContext服务
 * @description
 * @author Big Mogician
 * @export
 * @class BaseClass
 */
declare class BaseClass {
    ctx: Koa.Context;
    app: Koa;
    config: any;
    constructor(ctx: Koa.Context);
    getConfig(...args: any[]): any;
    getServiceClass(...args: any[]): any;
    getService(...args: any[]): any;
    callService(...args: any[]): any;
    invokeServiceMethod(...args: any[]): any;
    getLib(...args: any[]): any;
}
import { BaseClass } from "astroboy";
export { BaseClass };
