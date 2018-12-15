import path from "path";
import get from "lodash/get";
import { IRouterCmdOptions } from "./options";
import { exec } from "child_process";
import chalk from "chalk";

export = function (_, command: IRouterCmdOptions) {
  if (_ !== "router") return;
  const fileName = command.config || "atc.config.js";
  let config: any;
  const defaultConfigs = {
    enabled: true,
    always: false,
    approot: "",
    filetype: "js",
    details: false,
    tsconfig: undefined
  };
  try {
    config = {
      ...defaultConfigs,
      ...get(require(path.join(process.cwd(), fileName)), "routers", {})
    };
  } catch (_) {
    config = defaultConfigs;
  }
  if (command.enabled) config.enabled = String(command.enabled) === "true";
  if (command.always) config.always = String(command.always) === "true";
  if (command.details) config.details = String(command.details) === "true";
  if (command.approot) config.approot = command.approot;
  if (command.filetype) config.filetype = command.filetype;
  if (command.tsconfig) config.tsconfig = command.tsconfig;
  try {
    const tsnode = require.resolve("ts-node");
    const astroboy_ts = require.resolve("astroboy.ts");
    console.log(chalk.cyan("开始构建路由，请稍后========"));
    const registerFile = astroboy_ts.replace("/index.js", "/cmd/register");
    const initFile = astroboy_ts.replace("/index.js", "/cmd/init");
    exec(`node -r ${registerFile} ${initFile}`, {
      env: {
        CTOR_PATH: path.resolve(process.cwd(), "app/controllers"),
        ROUTER_PATH: path.resolve(process.cwd(), "app/routers"),
        ASTT_ENABLED: config.enabled === undefined ? "true" : String(!!config.enabled === true),
        ASTT_ALWAYS: String(!!config.always),
        APP_ROOT: config.approot || "",
        FILE_TYPE: config.filetype || "js",
        SHOW_ROUTERS: String(!!config.details),
        __TSCONFIG: config.tsconfig || "_"
      },
    }, (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.yellow("初始化routers失败"));
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(chalk.yellow("初始化routers失败"));
        console.log(stderr);
        return;
      }
      try {
        showRoutes(JSON.parse(stdout || "{}") || {});
      } catch (_) {
        console.log(chalk.red(_));
      }
      console.log(chalk.green("初始化routers完成"));
    });
  } catch (e) {
    console.log(chalk.yellow("初始化routers失败"));
    if (((<Error>e).message || "").includes("ts-node")) {
      console.log(chalk.red("请安装ts-node"));
      return;
    }
    throw e;
  }
};

function showRoutes(obj: any, preK?: string) {
  Object.keys(obj || {}).forEach(k => {
    if (typeof obj[k] === "string") {
      console.log(chalk.blue(!preK ? `--> ${k}` : `--> ${preK}/${k}`));
    } else {
      showRoutes(obj[k], !preK ? k : `${preK}/${k}`);
    }
  });
}