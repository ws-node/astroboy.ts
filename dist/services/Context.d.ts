/// <reference types="koa-router" />
import Koa from "koa";
export declare class Context {
    ctx: Koa.Context;
    constructor(ctx: Koa.Context);
}
