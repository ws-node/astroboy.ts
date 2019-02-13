import { IResult, IResultScope } from "../typings/IResult";
import { RenderResultOptions } from "../options";
/**
 * ## Body渲染约定的实现
 * * 按照约定将模板渲染到body相应中
 * @description
 * @author Big Mogician
 * @export
 * @class RenderResult
 * @implements {IResult}
 */
export declare class RenderResult implements IResult {
    private configs;
    constructor(value: string | Partial<RenderResultOptions>);
    /** 框架调用，请勿手动调用 */
    toResult({ injector, configs }: IResultScope): Promise<string>;
}
