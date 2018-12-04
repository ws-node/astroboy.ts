import { IResult, IResultScope } from "../typings/IResult";
import { JsonResultOptions } from "../configs/json";
export declare class JsonResult implements IResult {
    private value;
    private configs?;
    constructor(value: any, configs?: Partial<JsonResultOptions>);
    toResult({ configs }: IResultScope): string;
}
declare function camelCase(key: string): string;
export declare const JsonResolvers: {
    camelcase: typeof camelCase;
};
export {};
