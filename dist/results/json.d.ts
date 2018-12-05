import { IResult, IResultScope } from "../typings/IResult";
import { JsonResultOptions } from "../configs/json";
export declare class JsonResult implements IResult {
    private value;
    private configs?;
    constructor(value: any, configs?: Partial<JsonResultOptions>);
    /**
     * ### 将json对象序列化写入body
     * * @框架调用方法，请勿手动调用
     * @description
     * @author Big Mogician
     * @param {IResultScope} { configs }
     * @returns {string}
     * @memberof JsonResult
     */
    toResult({ configs }: IResultScope): string;
}
declare function camelCase(key: string): string;
export declare const JsonResolvers: {
    camelcase: typeof camelCase;
};
export {};
