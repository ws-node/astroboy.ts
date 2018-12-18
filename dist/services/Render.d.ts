import { AstroboyContext } from "./AstroboyContext";
interface IGlobalSetOptions {
    toSnake: boolean;
}
export declare namespace Render {
    interface Contract {
        readonly views: any;
        setView(obj: {
            [prop: string]: any;
        }): void;
        setView(obj: {
            [prop: string]: any;
        }, options: Partial<IGlobalSetOptions>): void;
        setView(key: string, obj: any): void;
        setView(key: string, obj: any, options: Partial<IGlobalSetOptions>): void;
    }
}
/**
 * ## 统一渲染服务
 * @description
 * @author Big Mogician
 * @export
 * @class Render
 */
export declare class Render implements Render.Contract {
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
