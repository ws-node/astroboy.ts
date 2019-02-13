import { CmdConfig, createCmdConfig, mergeCmdConfig, RouterConfig as RConfig, IENV as E } from "./src/cmd/base";
declare namespace CMD {
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
export default CMD;
export { E as Env, RConfig as RouterConfig, CmdConfig as Config, createCmdConfig as create, mergeCmdConfig as merge };
