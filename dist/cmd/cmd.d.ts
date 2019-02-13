import { CmdConfig, RouterConfig as RConfig, IENV as E } from "./base";
export declare namespace CMD {
    interface Env extends E {
    }
    interface RouterConfig extends RConfig {
    }
    interface Config extends CmdConfig {
        env?: Env;
        routers?: RouterConfig;
    }
    function create(config: Config): CmdConfig;
    function merge(merge: Config, config: Config): CmdConfig;
}
