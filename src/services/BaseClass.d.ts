import Koa from "koa";

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