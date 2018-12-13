import { IResult, IResultScope } from "../typings/IResult";
import { RenderResultOptions } from "../configs";
export declare class RenderResult implements IResult {
    private configs;
    constructor(value: string | Partial<RenderResultOptions>);
    toResult({ injector, configs }: IResultScope): Promise<string>;
}
