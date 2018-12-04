import { ConfigsCollection as ReadonlyConfigs } from "@bonbons/di";
import { InjectService } from "../services/Injector";
export interface IResultScope {
    configs: ReadonlyConfigs;
    injector: InjectService;
}
export declare type Async<T> = T | Promise<T>;
export interface IResult {
    toResult(scope: IResultScope): string | Promise<string>;
}
export declare type ICommonResultType = string | void | IResult;
export declare type IBodyResult = Async<ICommonResultType>;
