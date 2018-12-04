import { ConfigsCollection as ReadonlyConfigs } from "@bonbons/di";
import { InjectService } from "../services/Injector";

export interface IResultScope {
  configs: ReadonlyConfigs;
  injector: InjectService;
}

export type Async<T> = T | Promise<T>;

export interface IResult {
  toResult(scope: IResultScope): string | Promise<string>;
}

export type ICommonResultType = string | void | IResult;

export type IBodyResult = Async<ICommonResultType>;
