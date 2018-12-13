import path from "path";
import { ICmdOptions } from "./options";
import { exec } from "child_process";
import chalk from "chalk";

export = function (_, command: ICmdOptions) {
  try {
    const tsnode = require.resolve("ts-node");
    const astroboy_ts = require.resolve("astroboy.ts");
    process.env.__TSCONFIG = command.tsconfig || "_";
    console.log(chalk.cyan("Start building routers ****** "));
    const registerFile = astroboy_ts.replace("/index.js", "/cmd/register");
    const initFile = astroboy_ts.replace("/index.js", "/cmd/init");
    exec(`node -r ${registerFile} ${initFile}`, {
      env: {
        CTOR_PATH: path.resolve(process.cwd(), "app/controllers"),
        ROUTER_PATH: path.resolve(process.cwd(), "app/routers"),
        ASTT_ENABLED: command.enabled === undefined ? "true" : String(String(command.enabled) === "true"),
        ASTT_ALWAYS: String(String(command.always) === "true"),
        APP_ROOT: command.approot || "/",
        FILE_TYPE: command.filetype || "js"
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
      console.log(chalk.blue(stdout));
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

