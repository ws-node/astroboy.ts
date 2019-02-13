import { CmdConfig, RouterConfig as RConfig, IENV as E } from "./base";
export interface Env extends E {
}
export interface RouterConfig extends RConfig {
}
export interface Config extends CmdConfig {
    env?: Env;
    routers?: RouterConfig;
}
export declare function create(config: Config): CmdConfig;
export declare function merge(merge: Config, config: Config): CmdConfig;
