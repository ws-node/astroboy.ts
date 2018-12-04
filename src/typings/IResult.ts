import { ConfigsCollection as ReadonlyConfigs } from "@bonbons/di";
import { InjectService } from "../services/Injector";

export interface IResultScope {
  configs: ReadonlyConfigs;
  injector: InjectService;
}

/** 表示一个异步过程 */
export type Async<T> = T | Promise<T>;

/**
 * ## 路由方法返回接口定义
 * @description
 * @author Big Mogician
 * @export
 * @interface IResult
 */
export interface IResult {
  /**
   * ### 需要实现的解析函数
   * * 将目标处理成body内容
   * @description
   * @author Big Mogician
   * @param {IResultScope} scope
   * @returns {(string | Promise<string>)}
   * @memberof IResult
   */
  toResult(scope: IResultScope): string | Promise<string>;
}

export type ICommonResultType = string | void | IResult;

export type IBodyResult = Async<ICommonResultType>;
