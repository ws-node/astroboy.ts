import { Configs } from "../../services/Configs";
export declare enum SimpleLogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5
}
export declare class SimpleLogger {
    private configs;
    private env;
    constructor(configs: Configs);
    private log;
    trace(title: string): void;
    trace(title: string, details: any): void;
    debug(title: string): void;
    debug(title: string, details: any): void;
}
