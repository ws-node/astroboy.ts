export interface CommandPlugin {
    name: string;
    description: string;
    options: Array<[string, string]>;
    action: (...args: any[]) => void;
    help: (...args: any[]) => void;
}
export interface IENV {
    NODE_ENV?: string;
    NODE_PORT?: number | string;
    [key: string]: any;
}
export interface RouterConfig {
    enabled?: boolean;
    always?: boolean;
    approot?: string;
    filetype?: "js" | "ts";
    details?: boolean;
    tsconfig?: string;
}
export interface CmdConfig {
    tsconfig?: string;
    inspect?: boolean;
    env?: IENV;
    watch?: string[] | false;
    ignore?: string[] | false;
    verbose?: boolean;
    debug?: boolean | string;
    mock?: boolean | string;
    typeCheck?: boolean;
    transpile?: boolean;
    routers?: RouterConfig;
}
export interface InnerCmdConfig extends CmdConfig {
    env?: IENV & {
        __TSCONFIG?: any;
        __TRANSPILE?: any;
    };
    exec?: string;
}
export declare function createCmdConfig(config: CmdConfig): CmdConfig;
export declare function mergeCmdConfig(merge: CmdConfig, config: CmdConfig): CmdConfig;
