import Koa from "koa";
import { Injectable } from "../decorators/injectable";
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
@Injectable()
export class AstroboyContext<T = IContext, A = Koa, C = any> {

  /** BaseClass.ctx */
  public get ctx(): T { return <any>this.context.ctx || {}; }
  /** BaseClass.app */
  public get app(): A { return (this.ctx && (<any>this.ctx).app) || {}; }
  /** BaseClass.config */
  public get config(): C { return (this.app && this.app)["config"] || {}; }

  constructor(public context: Context<T>) { }

  getConfig(...args: any[]) {
    // @ts-ignore 参数定义override忽略
    return this.ctx.getConfig(...args);
  }

  getServiceClass(...args: any[]) {
    // @ts-ignore 参数定义override忽略
    return this.ctx.getServiceClass(...args);
  }

  getService(...args: any[]) {
    // @ts-ignore 参数定义override忽略
    return this.ctx.getService(...args);
  }

  callService(...args: any[]) {
    // @ts-ignore 参数定义override忽略
    return this.ctx.callService(...args);
  }

  invokeServiceMethod(...args: any[]) {
    // @ts-ignore 参数定义override忽略
    return this.ctx.invokeServiceMethod(...args);
  }

  getLib(...args: any[]) {
    // @ts-ignore 参数定义override忽略
    return this.ctx.getLib(...args);
  }

}