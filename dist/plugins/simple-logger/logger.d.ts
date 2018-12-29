import { Configs } from "../../services/Configs";
export declare class SimpleLogger {
    private configs;
    private pkgEnv;
    constructor(configs: Configs);
    private log;
    trace(title: string): void;
    trace(title: string, details: any): void;
    debug(title: string): void;
    debug(title: string, details: any): void;
}
