import { Injectable } from "../decorators/injectable";
import { Context } from "./Context";

@Injectable()
export class AstroboyContext<T = {}> {

  public get ctx() { return this.context.ctx; }
  public get app() { return this.ctx.app; }
  public get config() { return this.app["config"] || {}; }

  constructor(public context: Context<T>) { }

  getConfig(...args) {
    return this.ctx.getConfig(...args);
  }

  getServiceClass(...args) {
    return this.ctx.getServiceClass(...args);
  }

  getService(...args) {
    return this.ctx.getService(...args);
  }

  callService(...args) {
    return this.ctx.callService(...args);
  }

  invokeServiceMethod(...args) {
    return this.ctx.invokeServiceMethod(...args);
  }

  getLib(...args) {
    return this.ctx.getLib(...args);
  }

}