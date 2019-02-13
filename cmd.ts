import {
  CmdConfig,
  createCmdConfig,
  mergeCmdConfig,
  RouterConfig as RConfig,
  IENV as E
} from "./src/cmd/base";

namespace CMD {
  export interface Env extends E {}
  export interface RouterConfig extends RConfig {}
  export interface Config extends CmdConfig {
    env?: Env;
    routers?: RouterConfig;
  }

  export function create(config: Config) {
    return createCmdConfig(config);
  }

  export function merge(merge: Config, config: Config) {
    return mergeCmdConfig(merge, config);
  }
}

export default CMD;

export {
  E as Env,
  RConfig as RouterConfig,
  CmdConfig as Config,
  createCmdConfig as create,
  mergeCmdConfig as merge
};
