import { IResult, IResultScope } from "../typings/IResult";
import { JsonResultOptions } from "../options";
/**
 * ## Body序列化约定实现
 * * 按照约定将内容序列化到body响应中
 * @description
 * @author Big Mogician
 * @export
 * @class JsonResult
 * @implements {IResult}
 */
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
declare function snakeCase(key: string): string;
export declare const JsonResolvers: {
    camelcase: typeof camelCase;
    snakecase: typeof snakeCase;
};
export {};
