import path from "path";
import fs from "fs";
import nodemon from "nodemon";
import chalk from "chalk";
import childProcess, { ChildProcess } from "child_process";
import typescript = require("typescript");
import { IDevCmdOptions } from "./options";
import { CancellationToken } from "../utils/CancellationToken";
import { NormalizedMessage } from "../utils/NormalizedMessage";
import { loadConfig } from "../utils/loadConfig";

export = function(_, command: IDevCmdOptions) {
  if (_ !== "dev") return;
  console.log(chalk.green("========= [ASTROBOY.TS] <==> DEVTOOL ========"));
  const projectRoot = process.cwd();
  if (!fs.existsSync(`${projectRoot}/app/app.ts`)) {
    console.log(chalk.yellow("项目启动失败"));
    console.log(chalk.red(`当前项目不存在文件 ${projectRoot}/app/app.ts`));
    return;
  }
  const fileName = command.config || "atc.config.js";
  console.log(`${chalk.white("尝试加载配置文件 : ")}${chalk.yellow(fileName)}`);
  const config = loadConfig(projectRoot, fileName);

  if (config.env) {
    config.env = {
      ...config.env,
      NODE_ENV: command.env
        ? command.env
        : config.env.NODE_ENV || "development",
      NODE_PORT: command.port ? command.port : config.env.NODE_PORT || 8201
    };
  } else {
    config.env = {
      NODE_ENV: command.env ? command.env : "development",
      NODE_PORT: command.port ? command.port : 8201
    };
  }
  if (config.watch === false) {
    config.watch = [];
  } else if (!config.watch) {
    config.watch = [
      path.join(projectRoot, "app/**/*.*"),
      path.join(projectRoot, "config/**/*.*"),
      path.join(projectRoot, "plugins/**/*.*")
    ];
  }
  if (config.ignore === false) {
    config.ignore = [];
  } else if (!config.ignore) {
    config.ignore = [];
  }
  if (config.verbose === undefined) config.verbose = true;
  if (config.inspect === undefined) config.inspect = true;
  if (command.debug) config.debug = command.debug;
  if (command.tsconfig) config.tsconfig = command.tsconfig;
  if (command.mock) config.mock = command.mock;
  config.inspect = String(config.inspect) === "true";
  const checkStr = String(config.typeCheck);
  const transpile = String(config.transpile);
  config.typeCheck = checkStr === "undefined" ? true : checkStr === "true";
  config.transpile = transpile === "undefined" ? true : transpile === "true";

  // ts-node register
  config.env.__TSCONFIG = config.tsconfig || "-";
  config.env.__TRANSPILE =
    config.typeCheck && !config.transpile ? "false" : "true";

  // 传递了 --debug 参数，示例：
  // atc dev --debug
  // atc dev --debug koa:application
  if (config.debug && config.debug === true) {
    config.env.DEBUG = "*";
  } else if (config.debug && config.debug !== true) {
    config.env.DEBUG = config.debug;
  }

  // 传递了 --inspect 参数，示例：
  // atc dev --inspect
  const node = `node${!!config.inspect ? " --inspect" : ""}`;

  try {
    const tsnode = require.resolve("ts-node");
    const astroboy_ts = require.resolve("astroboy.ts");
    const registerFile = astroboy_ts.replace("/index.js", "/cmd/register");
    const ts_node = `-r ${registerFile}`;
    const tsc_path_map = `-r ${require
      .resolve("tsconfig-paths")
      .replace("/lib/index.js", "")}/register`;
    config.env.APP_EXTENSIONS = JSON.stringify(["js", "ts"]);
    config.exec = `${node} ${ts_node} ${tsc_path_map} ${path.join(
      projectRoot,
      "app/app.ts"
    )}`;
  } catch (error) {
    if ((<string>error.message || "").includes("ts-node")) {
      console.log(chalk.red("请安装ts-node"));
      return;
    } else {
      console.log(chalk.red(error));
      return;
    }
  }

  // 传递了--mock 参数
  // atc dev --mock
  // atc dev --mock https://127.0.0.1:8001
  if (config.mock) {
    const url = config.mock === true ? "http://127.0.0.1:8001" : config.mock;
    config.env.HTTP_PROXY = url;
    config.env.HTTPS_PROXY = url;
  }

  let token = refreshToken();
  let checkProcess: ChildProcess;

  nodemon(config)
    .on("start", () => {
      try {
        if (config.typeCheck && config.transpile) {
          checkProcess = startTypeCheck(projectRoot, config, token);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(chalk.yellow("开始运行应用执行脚本："));
      console.log(`script ==> ${chalk.grey(config.exec)}\n`);
      console.log(chalk.green("应用启动中...\n"));
      console.log(chalk.green("环境变量："));
      console.log(chalk.cyan(`NODE_ENV: \t${config.env.NODE_ENV}`));
      console.log(chalk.cyan(`NODE_PORT: \t${config.env.NODE_PORT}`));
      if (config.env.DEBUG) {
        console.log(chalk.yellow(`DEBUG: \t${config.env.DEBUG}`));
      }
      if (config.env.HTTP_PROXY) {
        console.log(chalk.cyan(`HTTP_PROXY: \t${config.env.HTTP_PROXY}`));
      }
      if (config.env.HTTPS_PROXY) {
        console.log(chalk.cyan(`HTTPS_PROXY: \t${config.env.HTTPS_PROXY}`));
      }
      console.log(chalk.green("\n监听目录变化："));
      const LENGTH = config.watch && config.watch.length;
      for (let i = 0; i < LENGTH; i++) {
        console.log(chalk.yellow(config.watch[i]));
      }
    })
    .on("quit", () => {
      console.log(chalk.green("应用退出成功"));
      process.kill(process.pid);
    })
    .on("restart", (files: any) => {
      token = refreshToken(token);
      checkProcess && checkProcess.kill();
      console.log(chalk.yellow("监听到文件修改：", files));
    });
};

function startTypeCheck(
  projectRoot: string,
  config: any,
  token: CancellationToken
) {
  console.log(chalk.blue("开始执行类型检查...\n"));
  const child = childProcess.fork(path.resolve(__dirname, "./check.js"), [], {
    env: {
      TSCONFIG: path.resolve(projectRoot, config.tsconfig || "tsconfig.json")
    }
  });
  child.on("message", (message: { diagnostics?: NormalizedMessage[] }) => {
    const { diagnostics } = message;
    if (diagnostics) {
      if (diagnostics.length === 0) {
        console.log(chalk.blue("类型检查通过，没有发现语法错误"));
        child.kill();
        return;
      }
      console.log(chalk.blue(`发现${diagnostics.length}个语法错误\n`));
      diagnostics.forEach(item => {
        const {
          type: _,
          code,
          severity,
          content,
          file,
          line,
          character
        } = item;
        console.log(
          chalk[severity === "error" ? "red" : "yellow"](
            `${String(
              severity
            ).toUpperCase()} in ${file}[${line},${character}] \nts${code ||
              0} : ${content}\n`
          )
        );
      });
      child.kill();
    } else {
      console.log(message);
    }
  });
  child.on("exit", () => console.log("类型检查已结束"));
  child.send(token);
  return child;
}

function refreshToken(token?: CancellationToken) {
  if (token && !token.isCancellationRequested()) token.cleanupCancellation();
  return (token = new CancellationToken(typescript));
}
