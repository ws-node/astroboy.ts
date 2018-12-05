import { GlobalDI, getShortScopeId, setScopeId, setColor, getScopeId } from "../utils";
import { IContext } from "../typings/IContext";
import { InjectService } from "../services/Injector";
import { ENV } from "../configs";
import { Configs } from "../services/Configs";
import { Scope } from "../services/Scope";

export interface IMiddlewaresScope<T = IContext> {
  injector: InjectService;
  configs: Configs;
  ctx: T;
  next: () => Promise<void>;
}

type ProvideInvoker<T extends IContext = IContext> = (bunddle: IMiddlewaresScope<T>) => void | Promise<void>;

/**
 * 创建具有依赖注入能力的中间件
 * @description
 * @author Big Mogician
 * @export
 * @template T extends IContext
 * @param {((bunddle: IMiddlewaresScope, ctx: T, next: () => Promise<void>) => void | Promise<void>)} middleware
 * @returns
 */
function createMiddleware<T extends IContext = IContext>(middleware: ProvideInvoker<T>) {
  return async (ctx: T, next: () => Promise<void>) => {
    const scopeId = getScopeId(ctx);
    const configs = GlobalDI.get(Configs, scopeId);
    const injector = GlobalDI.get(InjectService, scopeId);
    await middleware({ injector, configs, ctx, next });
  };
}

/**
 * ## astroboy.ts初始化中间件
 * * 请确保此中间件的优先级足够高
 * * 建议优先级<1
 * @param ctx IContext
 * @param next 下一个中间件
 */
export const serverInit = async (ctx: IContext, next: () => Promise<void>) => {
  const scopeId = setScopeId(ctx);
  GlobalDI.createScope(scopeId, { ctx });
  const injector = GlobalDI.get(InjectService, scopeId);
  const { showTrace } = injector.get(Configs).get(ENV);
  if (showTrace) {
    const scope = injector.get(Scope);
    scope.init(scopeId).begin();
    console.log(`${
      setColor("blue", "[astroboy.ts]")
      } : scope ${
      setColor("cyan", getShortScopeId(scopeId))
      } is init.`
    );
  }
  try {
    await next();
  } finally {
    if (showTrace) {
      const scope = injector.get(Scope);
      scope.end();
      const duration = scope.diration();
      console.log(`${
        setColor("blue", "[astroboy.ts]")
        } : scope ${
        setColor("cyan", getShortScopeId(injector.scopeId))
        } is [${
        setColor(duration > 500 ? "red" : duration > 200 ? "yellow" : "green", duration)
        } ms] disposed.`
      );
    }
    injector["INTERNAL_dispose"] && injector["INTERNAL_dispose"]();
  }
};

export {
  createMiddleware as injectScope
};
