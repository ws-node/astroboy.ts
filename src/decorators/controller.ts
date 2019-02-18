import { Constructor, IBaseInjectable } from "@bonbons/di";
import { Router } from "astroboy-router";
import { createInstance, GlobalImplements, getInjector } from "../utils";
import { InjectService } from "../services/Injector";
import { Context } from "../services/Context";
import { ICommonResultType, IResult } from "../typings/IResult";
import { IContext } from "../typings/IContext";
import { Configs } from "../services/Configs";
import { tryGetRouteMagic, RouteArgument } from "./route";
import { STATIC_RESOLVER } from "../options/typed-serialize.options";
import { IStaticTypedResolver } from "../typings/IStaticTypeResolver";

declare module "koa" {
  interface Request {
    body: any;
  }
}

const INTERNAL_INJECTOR = "$INTERNAL_INJECTOR";
const $$injector = "$$injector";

/**
 * ## 定义控制器
 * * routes部分由astroboy-router实现
 * @description
 * @author Big Mogician
 * @export
 * @param {string} prefix
 * @returns
 */
export function Controller(prefix: string) {
  return function<T>(target: Constructor<T>) {
    const prototype: IBaseInjectable = target.prototype;
    prototype.__valid = true;
    Router(prefix)(target);
    const DI_CONTROLLER = class {
      constructor(ctx) {
        const injector = getInjector(ctx);
        const controller = createInstance(target, ctx);
        controller[INTERNAL_INJECTOR] = injector;
        return controller;
      }
    };
    Object.defineProperty(prototype, $$injector, {
      get() {
        return this[INTERNAL_INJECTOR];
      },
      configurable: false,
      enumerable: false
    });
    const { routes = {} } = prototype["@router"];
    Object.getOwnPropertyNames(prototype).forEach(name => {
      if (name === "@router") return;
      if (name === "constructor") return;
      const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
      const { value, get } = descriptor;
      if (get) return;
      if (name in routes && value && typeof value === "function") {
        const { params: routeParams } = tryGetRouteMagic(prototype, name);
        descriptor.value = async function() {
          const injector: InjectService = this[$$injector];
          const { ctx } = injector.get<Context>(Context);
          const staticResolver = injector.get(Configs).get(STATIC_RESOLVER);
          const params = resolveRouteMethodParams(
            routeParams,
            ctx,
            staticResolver
          );
          const result: ICommonResultType = await value.bind(this)(...params);
          if (result) resolveMethodResult(result, ctx, injector);
        };
        Object.defineProperty(prototype, name, descriptor);
      }
    });
    copyPrototype<T>(DI_CONTROLLER, target);
    GlobalImplements.set(DI_CONTROLLER, target);
    return <Constructor<T>>DI_CONTROLLER;
  };
}

export function copyPrototype<T>(
  DI_CONTROLLER: Constructor<any>,
  target: Constructor<T>
) {
  Object.getOwnPropertyNames(target.prototype).forEach(name => {
    Object.defineProperty(
      DI_CONTROLLER.prototype,
      name,
      Object.getOwnPropertyDescriptor(target.prototype, name)
    );
  });
  // @ts-ignore
  DI_CONTROLLER.prototype.__proto__ = target.prototype.__proto__;
  // @ts-ignore
  DI_CONTROLLER.__proto__ = target.__proto__;
}

function resolveRouteMethodParams(
  routeParams: RouteArgument[],
  ctx: IContext,
  staticResolver: IStaticTypedResolver
) {
  const params: any[] = [];
  routeParams.forEach(i => {
    const { index, type, resolver, ctor, static: stac } = i;
    let final: any;
    if (type === "body") {
      const v = !resolver ? ctx.request.body : resolver(ctx.request.body || {});
      final = resolveStaticType(stac, ctor, v, staticResolver);
    } else {
      const v = !resolver
        ? { ...ctx.query, ...ctx.params }
        : resolver({ ...ctx.query, ...ctx.params });
      final = resolveStaticType(stac, ctor, v, staticResolver);
    }
    params[index] = final;
  });
  return params;
}

function resolveStaticType(
  stac: boolean | undefined,
  ctor: any,
  value: any,
  staticResolver: IStaticTypedResolver
) {
  return !ctor || stac === false
    ? value || {}
    : typeTransform(staticResolver, value, ctor);
}

function typeTransform(
  staticResolver: IStaticTypedResolver,
  value: any,
  ctor: any
) {
  switch (ctor) {
    case Number:
    case String:
      return ctor(value);
    case Boolean:
      return String(value || "") === "true";
    case Object:
      return value || {};
    default:
      return staticResolver.FromObject(value || {}, ctor);
  }
}

async function resolveMethodResult(
  result: string | IResult,
  ctx: IContext,
  injector: InjectService
) {
  if ((<IResult>result).toResult) {
    ctx.body = await (<IResult>result).toResult({
      injector,
      configs: injector.get(Configs)
    });
  } else {
    ctx.body = <string>result;
  }
}
