import { APIFactory, CustomRouteFactory } from "astroboy-router/dist/decorators/route.factory";
import { METHOD, IRouteFactory, IRouter } from "astroboy-router/dist/metadata";
import { tryGetRouter } from "astroboy-router/dist/decorators/utils";
import { getMethodParamsType } from "../utils";

const MAGIC_CONTENT = new Map<any, IRouterMagic<any>>();

type ParamsFactory<T = any> = (target: T, propertyKey: string, index: number) => void;
type ParamsResolver<T = any, R = any> = ((source: T) => R);

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
    }
  };
}

export function tryGetRouteMagic<T>(prototype: T, key: string) {
  const router = tryGetRouterMagic(prototype);
  let route = router.routes[key];
  if (!route) {
    router.routes[key] = route = {
      params: []
    };
  }
  return route;
}

export function tryGetRouterMagic<T>(prototype: T) {
  let found = MAGIC_CONTENT.get(prototype);
  if (!found) {
    MAGIC_CONTENT.set(prototype, found = {
      prototype,
      routes: {},
      routerMeta: tryGetRouter(prototype)
    });
  }
  return found;
}

export function FromParams(): ParamsFactory;
export function FromParams(options: Partial<ParamsOptions>): ParamsFactory;
export function FromParams(options?: Partial<ParamsOptions>) {
  const { transform = undefined, useStatic = undefined } = options || {};
  return function dynamic_params<T>(prototype: T, propKey: string, index: number) {
    route_query({ prototype, propKey, index, transform, useStatic, type: "params" });
  };
}

export function FromBody(): ParamsFactory;
export function FromBody(options: Partial<ParamsOptions>): ParamsFactory;
export function FromBody(options?: Partial<ParamsOptions>) {
  const { transform = undefined, useStatic = undefined } = options || {};
  return function dynamic_params<T>(prototype: T, propKey: string, index: number) {
    route_query({ prototype, propKey, index, transform, useStatic, type: "body" });
  };
}

function route_query<T>({ type, prototype, propKey, index, transform, useStatic }: {
  type: "params" | "body";
  prototype: T;
  propKey: string;
  index: number;
  transform?: any,
  useStatic?: boolean;
}) {
  const types = getMethodParamsType(prototype, propKey);
  tryGetRouteMagic(prototype, propKey).params.push({
    ctor: resolveParamType(types[index]),
    resolver: transform,
    static: useStatic,
    type,
    index
  });
}

function resolveParamType(type?: any) {
  if (!type) return undefined;
  if (type === Object) return undefined;
  return type;
}

function addMagicForRoute(method: METHOD, path: string): IRouteFactory {
  return function route_magic<T>(prototype: T, propKey: string, descriptor?: PropertyDescriptor) {
    APIFactory(method, path)(prototype, propKey, descriptor);
  };
}

/**
 * 最高扩展性的路由声明
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
export function __BASE_ROUTE_DECO_FACTORY(configs: {
  method: METHOD;
  tpls: string[];
  name?: string;
  isIndex?: boolean;
}) {
  return function __route_custom<T>(prototype: T, propKey: string, descriptor?: PropertyDescriptor) {
    return CustomRouteFactory(configs)(prototype, propKey, descriptor);
  };
}

export function GET(path: string) {
  return addMagicForRoute("GET", path);
}

export function PUT(path: string) {
  return addMagicForRoute("PUT", path);
}

export function POST(path: string) {
  return addMagicForRoute("POST", path);
}

export function DELETE(path: string) {
  return addMagicForRoute("DELETE", path);
}