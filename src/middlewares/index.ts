import { GlobalDI, getShortScopeId, setScopeId, setColor } from "../utils";
import { IContext } from "../typings/IContext";
import { InjectService } from "../services/Injector";
import { ENV } from "../configs";
import { Configs } from "../services/Configs";

export const serverInit = async (ctx: IContext, next: () => Promise<void>) => {
  const scopeId = setScopeId(ctx);
  GlobalDI.createScope(scopeId, { ctx });
  const injector = GlobalDI.get(InjectService, scopeId);
  const { mode } = injector.get(Configs).get(ENV);
  if (mode !== "production" && mode !== "prod") {
    console.log(`${
      setColor("blue", "[astroboy.ts]")
      } : scope ${
      setColor("cyan", getShortScopeId(scopeId))
      } is init [${
      setColor("green", new Date().getTime())
      }].`
    );
  }
  await next();
};