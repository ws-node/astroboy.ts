import { DIContainer, Constructor, InjectScope, ScopeID, InjectToken } from "@bonbons/di";
import { Context } from "./services/Context";
import { InjectService } from "./services/Injector";

export const GlobalDI = new DIContainer();
export const GlobalSourceDI = new DIContainer();
export const GlobalImplements = new Map<any, any>();
export const GlobalServiceMeta = new Map<any, any>();

export class Server {

  private di = GlobalDI;

  constructor(private appBuilder: Constructor<any>, private appConfigs?: any) { }

  public static Create(ctor: Constructor<any>, configs?: any) {
    return new Server(ctor, configs);
  }

  public run(onStart?: () => void) {
    GlobalDI.register(InjectService, (scopeId?: ScopeID) => ({
      get: (token: InjectToken) => this.di.get(token, scopeId),
      INTERNAL_dispose: () => this.di.dispose(scopeId),
      scopeId
    }), InjectScope.Scope);
    GlobalDI.register(Context, (scopeId?: ScopeID, { ctx = null } = {}) => {
      if (ctx === null) throw new Error("invalid call, you can only call a context in request pipe scope.");
      return new Context(ctx);
    }, InjectScope.Scope);
    new this.appBuilder(this.appConfigs || {}).on("start", () => {
      GlobalSourceDI.complete();
      GlobalDI.complete();
      Array.from((GlobalDI["map"] as Map<any, any>).entries()).forEach(([t, i]) => {
        const tempInstance = GlobalSourceDI.get(t);
        if (!tempInstance) return;
        const data: any = {};
        Object.getOwnPropertyNames(tempInstance).forEach(name => {
          data[name] = tempInstance[name];
        });
        GlobalServiceMeta.set(t, data);
      });
      onStart && onStart();
    });
  }

}