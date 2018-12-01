import { Injectable } from "../decorators/injectable";
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
@Injectable()
export class AstroboyContext<T = {}> {

  /** BaseClass.ctx */
  public get ctx() { return this.context.ctx; }
  /** BaseClass.app */
  public get app() { return this.ctx.app; }
  /** BaseClass.config */
  public get config() { return this.app["config"] || {}; }

  constructor(public context: Context<T>) { }

  getConfig(...args: any[]) {
    return this.ctx.getConfig(...args);
  }

  getServiceClass(...args: any[]) {
    return this.ctx.getServiceClass(...args);
  }

  getService(...args: any[]) {
    return this.ctx.getService(...args);
  }

  callService(...args: any[]) {
    // @ts-ignore
    return this.ctx.callService(...args);
  }

  invokeServiceMethod(...args: any[]) {
    // @ts-ignore
    return this.ctx.invokeServiceMethod(...args);
  }

  getLib(...args: any[]) {
    return this.ctx.getLib(...args);
  }

}