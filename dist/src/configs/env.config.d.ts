interface IENV {
    /** 设置DI解析的模式，默认：`'native'` */
    diType: "native" | "proxy";
    /** 运行环境，默认：`'development'` */
    env: string;
}
export declare const defaultEnv: IENV;
/** astroboy.ts环境变量 */
export declare const ENV: import("../services/Configs").ConfigToken<IENV>;
export {};
