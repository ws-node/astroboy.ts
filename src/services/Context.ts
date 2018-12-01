import Koa from "koa";

export class Context<T = {}> {
  public get ctx(): Koa.Context & T { return <any>this._ctx; }
  constructor(private _ctx: Koa.Context) { }
}