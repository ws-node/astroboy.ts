import { InnerRouterOptions } from "./options";
interface IRouter {
    [prop: string]: string | IRouter;
}
export declare function initRouters({ ctorFolder: base, routerFolder: routerBase, enabled: open, always, appRoot: root, fileType }: Partial<InnerRouterOptions>, onEnd?: (data: {
    routers?: IRouter;
    error?: Error;
}) => void): void;
export {};
