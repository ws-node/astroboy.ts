import { DIContainer, Constructor } from "@bonbons/di";

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
    new this.appBuilder(this.appConfigs || {}).on("start", () => {
      GlobalSourceDI.complete();
      GlobalDI.complete();
      Array.from((GlobalDI["map"] as Map<any, any>).entries()).forEach(([t, i]) => {
        const tempInstance = GlobalSourceDI.get(t);
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