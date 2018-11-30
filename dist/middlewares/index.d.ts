/// <reference types="koa-router" />
import Koa from "koa";
export declare const serverInit: (ctx: Koa.Context, next: () => Promise<void>) => Promise<void>;
