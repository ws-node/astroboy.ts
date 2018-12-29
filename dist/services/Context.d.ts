/// <reference types="koa-router" />
import Koa from "koa";
import { IContext } from "../typings/IContext";
export declare namespace Context {
    interface Contract<T = IContext> {
        ctx: T;
    }
}
/**
 * ## 基础上下文服务
 * @description
 * @author Big Mogician
 * @export
 * @class Context
 * @template T typeof `ctx` 类型
 */
export declare class Context<T = IContext> implements Context.Contract<T> {
    private _ctx;
    /**
     * ### Koa上下文对象
     * * 有可能被astroboy和后续框架扩展
     * @description
     * @readonly
     * @type {T} 聚合类型
     * @memberof Context
     */
    readonly ctx: T;
    constructor(_ctx: Koa.Context);
}
