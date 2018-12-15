import path from "path";
import { IRouterCmdOptions } from "./options";
import { exec } from "child_process";
import chalk from "chalk";

export = function (_, command: IRouterCmdOptions) {
  if (_ !== "router") return;
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
        ASTT_ENABLED: command.enabled === undefined ? "true" : String(String(command.enabled) === "true"),
        ASTT_ALWAYS: String(String(command.always) === "true"),
        APP_ROOT: command.approot || "/",
        FILE_TYPE: command.filetype || "js",
        SHOW_ROUTERS: String(String(command.details) === "true"),
        __TSCONFIG: command.tsconfig || "_"
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
        showRoutes(JSON.parse(stdout) || {});
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
      console.log(chalk.blue(!preK ? `--${obj[k]}` : `--${preK}/${obj[k]}`));
    } else {
      showRoutes(obj[k], !preK ? k : `${preK}/${k}`);
    }
  });
}