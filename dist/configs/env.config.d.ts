interface IENV {
    /** 是否打印astroboy.ts的记录日志，默认：`false` */
    showTrace: boolean;
    /** 设置DI解析的模式，默认：`'native'` */
    diType: "native" | "proxy";
}
export declare const defaultEnv: IENV;
/** astroboy.ts环境变量 */
export declare const ENV: import("../services/Configs").ConfigToken<IENV>;
export {};
