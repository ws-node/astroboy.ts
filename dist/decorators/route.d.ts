import { IRouteFactory, IRouter } from "astroboy-router/dist/metadata";
declare type ParamsFactory<T = any> = (target: T, propertyKey: string, index: number) => void;
declare type ParamsResolver<T = any, R = any> = ((source: T) => R);
interface ParamsOptions {
    transform: ParamsResolver;
    useStatic: boolean;
}
export interface RouteArgument {
    type: "params" | "body";
    index: number;
    resolver: ParamsResolver | undefined;
    static: boolean | undefined;
    constructor: any | undefined;
}
export interface IRouterMagic<T> {
    prototype: T;
    routerMeta: IRouter<T>;
    routes: {
        [prop: string]: {
            params: RouteArgument[];
        };
    };
}
export declare function tryGetRouteMagic<T>(prototype: T, key: string): {
    params: RouteArgument[];
};
export declare function tryGetRouterMagic<T>(prototype: T): IRouterMagic<any>;
export declare function FromParams(): ParamsFactory;
export declare function FromParams(options: Partial<ParamsOptions>): ParamsFactory;
export declare function FromBody(): ParamsFactory;
export declare function FromBody(options: Partial<ParamsOptions>): ParamsFactory;
export declare function GET(path: string): IRouteFactory;
export declare function PUT(path: string): IRouteFactory;
export declare function POST(path: string): IRouteFactory;
export declare function DELETE(path: string): IRouteFactory;
export {};
