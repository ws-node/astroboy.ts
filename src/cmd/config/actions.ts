import fs from "fs";
import path from "path";
import chalk from "chalk";
import get from "lodash/get";
import { IConfigCmdOptions } from "./options";
import { loadConfig } from "../utils/load-config";
import { ConfigCompilerConfig } from "../base";
import { exec } from "child_process";

export = function(_, command: IConfigCmdOptions) {
  if (_ !== "config") return;
  console.log(chalk.green("========= [ASTROBOY.TS] <==> CONFIGS ========"));
  const projectRoot = process.cwd();
  const fileName = command.config || "atc.config.js";
  console.log(`${chalk.white("尝试加载配置文件 : ")}${chalk.yellow(fileName)}`);

  let config: ConfigCompilerConfig;
  const defaultConfigs: ConfigCompilerConfig = {
    enabled: true,
    configroot: undefined,
    outputroot: undefined,
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
    console.log(chalk.cyan("正在编译configs，请稍候...\n"));
    const registerFile = path.resolve(__dirname, "../register");
    const initFile = path.resolve(__dirname, "../process/compile-configs");
    console.log(chalk.yellow("开始执行configs编译逻辑："));
    console.log(`script ==> ${chalk.grey(initFile)}`);
    exec(
      `node -r ${registerFile} ${initFile}`,
      {
        env: {
          CONFIG_ROOT: config.configroot || "-",
          OUTPUT_ROOT: config.outputroot || "-",
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
          console.log(chalk.yellow("编译configs失败."));
          console.log(chalk.red(<any>error));
          console.log("--------------------");
          return;
        }
        if (stderr) {
          console.log(chalk.yellow("编译configs失败.."));
          console.log(chalk.red(stderr));
          console.log("--------------------");
          return;
        }
        try {
          const count = showCounts(JSON.parse(stdout || "[]") || []);
          console.log(
            chalk.green(`configs编译完成${chalk.white(`[${count}]`)}`)
          );
          console.log(chalk.green(`编译configs完成`));
        } catch (_) {
          console.log(chalk.yellow("编译configs失败..."));
          console.log(chalk.red(_));
          console.log("--------------------");
        }
      }
    );
  } catch (e) {
    console.log(chalk.yellow("编译configs失败"));
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
