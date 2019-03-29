import * as RT from "astroboy-router";
import * as MT from "astroboy-router/metadata";
import { METHOD, IRouteFactory } from "astroboy-router/metadata";
import { IStaticTypedResolver } from "../typings/IStaticTypeResolver";
import { PartReset } from "../utils";

export type RouteArgsFactory<T = any> = (
  target: T,
  propertyKey: string,
  index: number
) => void;

export interface IParamsArgsOptions
  extends PartReset<MT.IParamsArgsOptions, { useStatic: any }> {
  useStatic: boolean;
}

export interface IBodyArgsOptions
  extends PartReset<MT.IBodyArgsOptions, { useStatic: any }> {
  useStatic: boolean;
}

export interface IQueryArgsOptions
  extends PartReset<MT.IQueryArgsOptions, { useStatic: any }> {
  useStatic: boolean;
}

export interface IRequestArgsOptions
  extends PartReset<MT.IRequestArgsOptions, { useStatic: any }> {
  useStatic: boolean;
}

interface IStaticContext {
  resolver: IStaticTypedResolver;
  type: any;
}

function staticResolve(data: any, { resolver, type }: IStaticContext) {
  return resolver.FromObject(data, type);
}

/**
 * ## 从request中获取params
 * @description
 * @author Big Mogician
 * @export
 * @returns {RouteArgsFactory}
 */
export function FromParams(): RouteArgsFactory;
export function FromParams(
  options: Partial<IParamsArgsOptions>
): RouteArgsFactory;
export function FromParams(options: Partial<IParamsArgsOptions> = {}) {
  return RT.FromParams({
    transform: options.transform,
    useStatic: options.useStatic && staticResolve
  });
}

/**
 * ## 从request中获取query
 * @description
 * @author Big Mogician
 * @export
 * @returns {RouteArgsFactory}
 */
export function FromQuery(): RouteArgsFactory;
export function FromQuery(
  options: Partial<IQueryArgsOptions>
): RouteArgsFactory;
export function FromQuery(options: Partial<IQueryArgsOptions> = {}) {
  return RT.FromQuery({
    transform: options.transform,
    useStatic: options.useStatic && staticResolve
  });
}

/**
 * ## 从request中获取body
 * @description
 * @author Big Mogician
 * @export
 * @returns {RouteArgsFactory}
 */
export function FromBody(): RouteArgsFactory;
export function FromBody(options: Partial<IBodyArgsOptions>): RouteArgsFactory;
export function FromBody(options: Partial<IBodyArgsOptions> = {}) {
  return RT.FromBody({
    transform: options.transform,
    useStatic: options.useStatic && staticResolve
  });
}

/**
 * ## 从request中获取内容
 * * 顶级装饰器，用于定制
 * @description
 * @author Big Mogician
 * @export
 * @returns {RouteArgsFactory}
 */
export function FromRequest(): RouteArgsFactory;
export function FromRequest(
  options: Partial<IRequestArgsOptions>
): RouteArgsFactory;
export function FromRequest(options: Partial<IRequestArgsOptions> = {}) {
  const { useStatic, ...others } = options;
  return RT.FromRequest({
    ...others,
    useStatic: useStatic && staticResolve
  });
}

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
 * }} configs
 * @returns
 */
export function BASE_ROUTE_DECO_FACTORY(configs: {
  method: METHOD;
  tpls: string[];
  name?: string;
}) {
  return RT.CustomRoute(configs);
}

function BaseFactory(method: METHOD, paths: string[]) {
  return RT.CustomRoute({
    method,
    tpls: paths.map(path => ({
      tpl: "{{@group}}/{{@path}}",
      sections: { path }
    }))
  });
}

/**
 * ## 定义GET请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export function Index(paths: string[]): IRouteFactory {
  return BaseFactory("GET", paths);
}

/**
 * ## 定义GET请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export function GET(path: string): IRouteFactory {
  return BaseFactory("GET", [path]);
}

/**
 * ## 定义PUT请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export function PUT(path: string): IRouteFactory {
  return BaseFactory("PUT", [path]);
}

/**
 * ## 定义POST请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export function POST(path: string): IRouteFactory {
  return BaseFactory("POST", [path]);
}

/**
 * ## 定义DELETE请求
 * @description
 * @author Big Mogician
 * @export
 * @param {string} path
 * @returns {IRouteFactory}
 */
export function DELETE(path: string): IRouteFactory {
  return BaseFactory("DELETE", [path]);
}
