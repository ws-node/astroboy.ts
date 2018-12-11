export interface InnerENV extends IENV {
    ctorFolder: string;
    routerFolder: string;
}
export interface IENV {
    /** 是否打印astroboy.ts的记录日志，默认：`false` */
    showTrace: boolean;
    /** 设置DI解析的模式，默认：`'native'` */
    diType: "native" | "proxy";
    /** 是否自动生成2.0的routers，默认：`false` */
    routerAutoBuild: boolean;
    /** 是否强制刷新2.0的routers，默认：`false` */
    routerAlwaysBuild: boolean;
    /** 整个项目的url前缀，默认：`'/'` */
    routerRoot: string;
}
export declare const defaultEnv: InnerENV;
/** astroboy.ts环境变量 */
export declare const ENV: import("../services/Configs").ConfigToken<IENV>;
