import { IRouteFactory, IRouter } from "astroboy-router/dist/metadata";
export interface RouteArgument {
    type: "params" | "body";
    index: number;
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
export declare function FromParams(): <T>(prototype: T, propKey: string, index: number) => void;
export declare function FromBody(): <T>(prototype: T, propKey: string, index: number) => void;
export declare function GET(path: string): IRouteFactory;
export declare function PUT(path: string): IRouteFactory;
export declare function POST(path: string): IRouteFactory;
export declare function DELETE(path: string): IRouteFactory;
