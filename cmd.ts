import {
  CmdConfig,
  createCmdConfig,
  mergeCmdConfig,
  RouterConfig as RConfig,
  ConfigCompilerCmdConfig as CCConfig,
  IENV as E
} from "./src/cmd/base";

namespace CMD {
  export interface Env extends E {}
  export interface RouterConfig extends RConfig {}
  export interface ConfigCompilerConfig extends CCConfig {}
  export interface Config extends CmdConfig {
    env?: Env;
    routers?: RouterConfig;
    configCompiler?: ConfigCompilerConfig;
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
  CCConfig as ConfigCompilerConfig,
  CmdConfig as Config,
  createCmdConfig as create,
  mergeCmdConfig as merge
};
