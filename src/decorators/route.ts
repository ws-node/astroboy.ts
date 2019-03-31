import * as RT from "astroboy-router";
import * as MT from "astroboy-router/metadata";
import { Constructor } from "@bonbons/di";
import { METHOD, IRouteFactory } from "astroboy-router/metadata";
import { IStaticTypedResolver } from "../typings/IStaticTypeResolver";
import { PartReset } from "../utils";

export type RouteArgsFactory<T = any> = (
  target: T,
  propertyKey: string,
  index: number
) => void;

interface IBaseArgsOptions {
  useStatic: boolean;
  finally(data: any, types?: Constructor<any>[]): any;
}

export interface IParamsArgsOptions
  extends PartReset<MT.IParamsArgsOptions, { useStatic: any }>,
    IBaseArgsOptions {}

export interface IBodyArgsOptions
  extends PartReset<MT.IBodyArgsOptions, { useStatic: any }>,
    IBaseArgsOptions {}

export interface IQueryArgsOptions
  extends PartReset<MT.IQueryArgsOptions, { useStatic: any }>,
    IBaseArgsOptions {}

export interface IRequestArgsOptions
  extends PartReset<MT.IRequestArgsOptions, { useStatic: any }>,
    IBaseArgsOptions {}

interface IStaticContext {
  resolver: IStaticTypedResolver;
  type: any[];
}

function staticResolve(data: any, { resolver, type = [] }: IStaticContext) {
  return resolver.FromObject(data, type[0]);
}

function decideStaticFn(
  options: Partial<IRequestArgsOptions>
): (data: any, options: IStaticContext) => any {
  const { useStatic, finally: finalStep } = options;
  if (!finalStep && !useStatic) return undefined;
  if (!useStatic) return (data, opts) => finalStep(data, opts.type);
  if (!finalStep) return staticResolve;
  return (data, options) =>
    finalStep(staticResolve(data, options), options.type);
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
  const useStatic = decideStaticFn(options);
  return RT.FromParams({
    useTypes: options.useTypes,
    transform: options.transform,
    useStatic
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
  const useStatic = decideStaticFn(options);
  return RT.FromQuery({
    useTypes: options.useTypes,
    transform: options.transform,
    useStatic
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
  const useStatic = decideStaticFn(options);
  return RT.FromBody({
    useTypes: options.useTypes,
    transform: options.transform,
    useStatic
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
  const { useStatic: _, ...others } = options;
  const useStatic = decideStaticFn(options);
  return RT.FromRequest({
    ...others,
    useStatic
  });
}

export type HttpMethod = METHOD | "PATCH" | "OPTION";

/**
 * ## 最高扩展性的路由声明
 * * 使用这个扩展工厂构造Route声明
 * @description
 * @author Big Mogician
 * @export
 * @param {{
 *   method: HttpMethod;
 *   tpls: string[];
 *   name?: string;
 * }} configs
 * @returns
 */
export function BASE_ROUTE_DECO_FACTORY(configs: {
  method: HttpMethod;
  tpls: string[];
  name?: string;
}) {
  return RT.CustomRoute(<any>configs);
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
