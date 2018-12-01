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
export class BaseClass {
  public ctx: Koa.Context;
  public app: Koa;
  public config: any;
  constructor(ctx: Koa.Context);
  getConfig(...args): any;
  getServiceClass(...args): any;
  getService(...args): any;
  callService(...args): any;
  invokeServiceMethod(...args): any;
  getLib(...args): any;
}