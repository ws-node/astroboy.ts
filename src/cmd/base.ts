import get from "lodash/get";

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
  env?: IENV & { __TSCONFIG?: any; __TRANSPILE?: any };
  exec?: string;
}

export function createCmdConfig(config: CmdConfig): CmdConfig {
  return config;
}

export function mergeCmdConfig(merge: CmdConfig, config: CmdConfig): CmdConfig {
  const watch = get(merge, "watch", undefined);
  const ignore = get(merge, "ignore", undefined);
  const {
    NODE_ENV: env = undefined,
    NODE_PORT: port = undefined,
    ...othersEnv
  }: IENV = get(merge, "env", {});
  const {
    NODE_ENV: newEnv = undefined,
    NODE_PORT: newPort = undefined,
    ...newEnvs
  }: IENV = get(merge, "env", {});
  const envIsEmpty = !merge.env && !config.env;
  return {
    tsconfig: get(merge, "tsconfig", config.tsconfig),
    inspect: get(merge, "inspect", config.inspect),
    env: envIsEmpty
      ? undefined
      : {
          NODE_ENV: env === undefined ? newEnv : env,
          NODE_PORT: port === undefined ? newPort : port,
          ...othersEnv,
          ...newEnvs
        },
    watch: !watch
      ? config.watch
      : config.watch !== false
      ? [...watch, ...(config.watch || [])]
      : false,
    ignore: !ignore
      ? config.ignore
      : config.ignore !== false
      ? [...ignore, ...(config.ignore || [])]
      : false,
    verbose: get(merge, "verbose", config.verbose),
    debug: get(merge, "debug", config.debug),
    mock: get(merge, "mock", config.mock),
    typeCheck: get(merge, "typeCheck", config.typeCheck),
    transpile: get(merge, "transpile", config.transpile),
    routers: {
      ...get(merge, "routers", {}),
      ...get(config, "routers", {})
    }
  };
}
