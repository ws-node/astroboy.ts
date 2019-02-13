import { METHOD, IRouteFactory, IRouter } from "astroboy-router/dist/metadata";
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
    ctor: any | undefined;
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
/**
 * ## 从request中获取params和query
 * @description
 * @author Big Mogician
 * @export
 * @returns {ParamsFactory}
 */
export declare function FromParams(): ParamsFactory;
export declare function FromParams(options: Partial<ParamsOptions>): ParamsFactory;
/**
 * ## 从request中获取body
 * @description
 * @author Big Mogician
 * @export
 * @returns {ParamsFactory}
 */
export declare function FromBody(): ParamsFactory;
export declare function FromBody(options: Partial<ParamsOptions>): ParamsFactory;
/**
 * ## 最高扩展性的路由声明
 * * 使用这个扩展工厂构造Route声明
 * @description
 * @author Big Mogician
 * @export
 * @param {{
 *   method: METHOD;
 *   tpls: string[];
 *   name?: string;
 *   isIndex?: boolean;
 * }} configs
 * @returns
 */
export declare function __BASE_ROUTE_DECO_FACTORY(configs: {
    method: METHOD;
    tpls: string[];
    name?: string;
    isIndex?: boolean;
}): <T>(prototype: T, propKey: string, descriptor?: PropertyDescriptor) => any;
/**
 * ## 定义GET请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export declare function GET(path: string): IRouteFactory;
/**
 * ## 定义PUT请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export declare function PUT(path: string): IRouteFactory;
/**
 * ## 定义POST请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export declare function POST(path: string): IRouteFactory;
/**
 * ## 定义DELETE请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export declare function DELETE(path: string): IRouteFactory;
export {};
