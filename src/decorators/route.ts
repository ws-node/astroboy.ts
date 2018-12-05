import { APIFactory } from "astroboy-router/dist/decorators/route.factory";
import { METHOD, IRouteFactory, IRouter } from "astroboy-router/dist/metadata";
import { tryGetRouter } from "astroboy-router/dist/decorators/utils";

const MAGIC_CONTENT = new Map<any, IRouterMagic<any>>();

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

export function FromParams() {
  return function route_query<T>(prototype: T, propKey: string, index: number) {
    tryGetRouteMagic(prototype, propKey).params.push({
      type: "params",
      index
    });
  };
}

export function FromBody() {
  return function route_query<T>(prototype: T, propKey: string, index: number) {
    tryGetRouteMagic(prototype, propKey).params.push({
      type: "body",
      index
    });
  };
}

function addMagicForRoute(method: METHOD, path: string): IRouteFactory {
  return function route_magic<T>(prototype: T, propKey: string, descriptor?: PropertyDescriptor) {
    APIFactory(method, path)(prototype, propKey, descriptor);
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