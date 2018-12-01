import Koa from "koa";
import { IContext } from "../typings/IContext";

/**
 * ## 基础上下文服务
 * @description
 * @author Big Mogician
 * @export
 * @class Context
 * @template T
 */
export class Context<T = {}> {
  /**
   * ### Koa上下文对象
   * * 有可能被astroboy和后续框架扩展
   * @description
   * @readonly
   * @type {(KIContext & T)} 聚合类型
   * @memberof Context
   */
  public get ctx(): IContext & T { return <any>this._ctx; }
  constructor(private _ctx: Koa.Context) { }
}