import { AstroboyContext } from "./AstroboyContext";
interface IGlobalSetOptions {
    toSnake: boolean;
}
export declare class Render {
    private context;
    private _views;
    readonly views: any;
    constructor(context: AstroboyContext);
    setView(obj: {
        [prop: string]: any;
    }): void;
    setView(obj: {
        [prop: string]: any;
    }, options: Partial<IGlobalSetOptions>): void;
    setView(key: string, obj: any): void;
    setView(key: string, obj: any, options: Partial<IGlobalSetOptions>): void;
}
export {};
