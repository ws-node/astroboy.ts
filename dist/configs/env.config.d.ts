export interface IENV {
    /** 是否打印astroboy.ts的记录日志 */
    showTrace: boolean;
    diType: "native" | "proxy";
    routerAutoBuild: boolean;
    ctorFolder: string;
    routerFolder: string;
    routerRoot: string;
}
export declare const defaultEnv: IENV;
/** astroboy.ts环境变量 */
export declare const ENV: import("../services/Configs").ConfigToken<IENV>;
