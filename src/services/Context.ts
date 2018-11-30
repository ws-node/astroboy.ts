import Koa from "koa";

export class Context {
  constructor(public ctx: Koa.Context) { }
}