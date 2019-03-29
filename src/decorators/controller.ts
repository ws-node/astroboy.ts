import { Constructor, IBaseInjectable } from "@bonbons/di";
import { Router } from "astroboy-router";
import { IRouteBuildContext, IRouteDescriptor } from "astroboy-router/metadata";
import {
  createLifeHooks,
  createBuildHelper
} from "astroboy-router/entrance/build";
import { tryGetRouter } from "astroboy-router/utils";
import { createInstance, getInjector } from "../utils";
import { InjectService } from "../services/Injector";
import { Context } from "../services/Context";
import { ICommonResultType, IResult } from "../typings/IResult";
import { IContext } from "../typings/IContext";
import { Configs } from "../services/Configs";
import { STATIC_RESOLVER } from "../options/typed-serialize.options";

declare module "koa" {
  interface Request {
    body: any;
  }
}

const INTERNAL_INJECTOR = "$INTERNAL_INJECTOR";
const $$injector = "$$injector";

function onBuild(context: IRouteBuildContext, descriptor: IRouteDescriptor) {
  const { lifeCycle } = context.router;
  const { pipes } = context.route;
  const needPipe = pipes.rules.length > 0;
  const needOnPipe = (lifeCycle.onPipes || []).length > 0;
  const needOnEnter = (lifeCycle.onEnter || []).length > 0;
  const needOnQuit = (lifeCycle.onQuit || []).length > 0;
  const source: (...args: any[]) => Promise<any> = descriptor.value;
  const hooks = createLifeHooks(lifeCycle);
  const helpers = createBuildHelper(context);
  descriptor.value = async function() {
    if (needOnPipe) await hooks.runOnPipes.call(this);
    if (needPipe) await hooks.runPipes.call(this, pipes);
    if (needOnEnter) await hooks.runOnEnters.call(this);
    const injector: InjectService = (<any>this)[$$injector];
    const context = injector.get<Context>(Context);
    const staticResolver = injector.get(Configs).get(STATIC_RESOLVER);
    const args = helpers.parseArgs.call(this, { resolver: staticResolver });
    const result: ICommonResultType = await source.call(this, ...args);
    if (result) resolveMethodResult(result, context.ctx, injector);
    if (needOnQuit) await hooks.runOnQuits.call(this);
  };
  return descriptor;
}

/**
 * ## 定义控制器
 * * routes部分由astroboy-router实现
 * @description
 * @author Big Mogician
 * @export
 * @param {string} group
 * @returns
 */
export function Controller(group: string) {
  return function<T>(target: Constructor<T>) {
    const prototype: IBaseInjectable = target.prototype;
    prototype.__valid = true;
    Router({
      group,
      register(delegate) {
        delegate.lifecycle("onBuild", onBuild, true);
      }
    })(target);
    const DI_CONTROLLER = class {
      static __FORK = target;
      constructor(ctx: any) {
        const injector = getInjector(ctx);
        const controller: any = createInstance(target, ctx);
        controller[INTERNAL_INJECTOR] = injector;
        return controller;
      }
    };
    DI_CONTROLLER.prototype["@router"] = tryGetRouter(<any>prototype);
    Object.defineProperty(prototype, $$injector, {
      get() {
        return this[INTERNAL_INJECTOR];
      },
      configurable: false,
      enumerable: false
    });
    copyPrototype<T>(DI_CONTROLLER, target);
    // GlobalImplements.set(DI_CONTROLLER, target);
    return <Constructor<T>>(<unknown>DI_CONTROLLER);
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
      Object.getOwnPropertyDescriptor(target.prototype, name)!
    );
  });
  // @ts-ignore
  DI_CONTROLLER.prototype.__proto__ = target.prototype.__proto__;
  // @ts-ignore
  DI_CONTROLLER.__proto__ = target.__proto__;
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
