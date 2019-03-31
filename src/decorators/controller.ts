import { Constructor, IBaseInjectable } from "@bonbons/di";
import { Router, createRouter } from "astroboy-router";
import {
  IRouteBuildContext,
  IRouteDescriptor,
  IControllerConstructor,
  IArgSolutionsContext,
  IParseArgsOptions
} from "astroboy-router/metadata";
import {
  createLifeHooks,
  createBuildHelper
} from "astroboy-router/entrance/build";
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

const INTERNAL_INJECTOR = Symbol.for("DI_CONTROLLER::INTERNAL_INJECTOR");
const FORK_TARGET = Symbol.for("DI_CONTROLLER::FORK_TARGET");
const InjectorGetter = Symbol.for("DI_CONTROLLER::injector");

/**
 * 重新定义args的获取方式
 *
 * @author Big Mogician
 * @param {any} delegator 控制器instance
 * @returns {IArgSolutionsContext}
 */
function fetchArgs(delegator: any): IArgSolutionsContext {
  const injector: InjectService = (<any>delegator)[InjectorGetter];
  const context = injector.get<Context>(Context);
  return {
    query: context.ctx.query || {},
    params: context.ctx.params || {},
    body: context.ctx.request.body || {}
  };
}

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
    const injector: InjectService = (<any>this)[InjectorGetter];
    const context = injector.get<Context>(Context);
    const staticResolver = injector.get(Configs).get(STATIC_RESOLVER);
    const args = helpers.parseArgs.call(this, {
      fetchArgs,
      // 重新定义静态类型处理器
      resolver: staticResolver
    } as Partial<IParseArgsOptions>);
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
      static [FORK_TARGET] = target;
      constructor(ctx: any) {
        const injector = getInjector(ctx);
        const controller: any = createInstance(target, ctx);
        controller[INTERNAL_INJECTOR] = injector;
        return controller;
      }
    };
    prototype["@router::v2"] = true;
    copyPrototype(DI_CONTROLLER, target);
    Object.defineProperty(prototype, InjectorGetter, {
      get() {
        return this[INTERNAL_INJECTOR];
      },
      configurable: false,
      enumerable: false
    });
    return <Constructor<T>>(<unknown>DI_CONTROLLER);
  };
}

export function getForkSource(target: any) {
  const source = target[FORK_TARGET];
  if (!source) {
    throw new Error(
      "astroboy.ts buildController failed: no fork source found."
    );
  }
  return source;
}

/**
 * 执行简单的原型拷贝
 * * 目的在于astroboy的routers在构建时会检查是否存在当前路由方法
 * * 返回的DI_CONTROLLER不存在相关函数信息，会报错
 * * 再运行时，执行的是真实的控制器对象上的逻辑
 * @param DI_CONTROLLER DI控制器构造函数
 * @param target 真实控制器构造函数
 */
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

/**
 * ## 构建路由
 * * 等效astroboy-router的createRouter方法
 * @description
 * @author Big Mogician
 * @export
 * @template T
 * @param {ControllerConstructor<T>} ctor
 * @param {string} name
 * @param {string} root
 * @returns
 */
export function buildRouter<T>(
  ctor: IControllerConstructor<T>,
  name: string,
  root: string
) {
  return createRouter(getForkSource(ctor), name, root);
}
