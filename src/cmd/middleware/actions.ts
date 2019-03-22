import fs from "fs";
import path from "path";
import chalk from "chalk";
import get from "lodash/get";
import { IMiddlewareCmdOptions } from "./options";
import { loadConfig } from "../utils/load-config";
import { MiddlewareCompilerConfig } from "../base";
import { exec } from "child_process";

export = function(_, command: IMiddlewareCmdOptions) {
  if (_ !== "middleware") return;
  console.log(chalk.green("========= [ASTROBOY.TS] <==> MIDDLEWARES ========"));
  const projectRoot = process.cwd();
  const fileName = command.config || "atc.config.js";
  console.log(`${chalk.white("尝试加载配置文件 : ")}${chalk.yellow(fileName)}`);

  let config: MiddlewareCompilerConfig;
  const defaultConfigs: MiddlewareCompilerConfig = {
    enabled: true,
    root: undefined,
    output: undefined,
    force: false,
    tsconfig: undefined
  };
  try {
    const req = loadConfig(projectRoot, fileName);
    config = {
      ...defaultConfigs,
      ...get(req, "configCompiler", {}),
      tsconfig: req.tsconfig || config.tsconfig
    };
  } catch (_) {
    config = defaultConfigs;
  }

  if (command.force) config.force = String(command.force) === "true";
  if (command.config) config.tsconfig = String(command.config);

  try {
    const tsnode = require.resolve("ts-node");
    console.log(chalk.cyan("正在编译middlewares，请稍候...\n"));
    const registerFile = path.resolve(__dirname, "../register");
    const initFile = path.resolve(__dirname, "../process/middleware-run");
    console.log(chalk.yellow("开始执行middlewares编译逻辑："));
    console.log(`script ==> ${chalk.grey(initFile)}`);
    exec(
      `node -r ${registerFile} ${initFile}`,
      {
        env: {
          FOLDER_ROOT: config.root || "-",
          OUTPUT_ROOT: config.output || "-",
          FORCE: String(config.force === true),
          ENABLED: String(config.enabled === true),
          __TSCONFIG: path.resolve(
            projectRoot,
            config.tsconfig || "tsconfig.json"
          )
        }
      },
      (error, stdout, stderr) => {
        if (error) {
          console.log(chalk.yellow("编译middlewares失败."));
          console.log(chalk.red(<any>error));
          console.log("--------------------");
          return;
        }
        if (stderr) {
          console.log(chalk.yellow("编译middlewares失败.."));
          console.log(chalk.red(stderr));
          console.log("--------------------");
          return;
        }
        try {
          const count = showCounts(JSON.parse(stdout || "[]") || []);
          console.log(
            chalk.green(`middlewares编译完成${chalk.white(`[${count}]`)}`)
          );
          console.log(chalk.green(`编译middlewares完成`));
        } catch (_) {
          console.log(chalk.yellow("编译middlewares失败..."));
          console.log(chalk.red(_));
          console.log("--------------------");
        }
      }
    );
  } catch (e) {
    console.log(chalk.yellow("编译middlewares失败"));
    if (((<Error>e).message || "").includes("ts-node")) {
      console.log(chalk.red("请安装ts-node"));
      return;
    }
    throw e;
  }
};

function showCounts(arr: any) {
  (arr || []).forEach(name => {
    console.log(chalk.blue(`---> ${name}`));
  });
  return (arr || []).length;
}
