export interface InnerRouterOptions extends RouterOptions {
    ctorFolder: string;
    routerFolder: string;
}
export interface RouterOptions {
    /** 是否自动生成2.0的routers，默认：`false` */
    enabled: boolean;
    /** 是否强制刷新2.0的routers，默认：`false` */
    always: boolean;
    /** 整个项目的url前缀，默认：`'/'` */
    appRoot: string;
    /** 生成router文件的文件类型，默认：`'js'` */
    fileType: "js" | "ts";
}
export declare const defaultRouterOptions: InnerRouterOptions;
export declare const ROUTER_OPTIONS: import("../services/Configs").ConfigToken<RouterOptions>;
