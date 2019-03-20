import fs from "fs";
import chalk from "chalk";
import get from "lodash/get";
import { IConfigCmdOptions } from "./options";
import { loadConfig } from "../utils/loadConfig";
import { ConfigCompilerConfig } from "../base";

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
    force: false,
    tsconfig: undefined
  };
  try {
    const req = loadConfig(process.cwd(), fileName);
    config = {
      ...defaultConfigs,
      ...get(req, "configCompiler", {}),
      tsconfig: req.tsconfig || config.tsconfig
    };
  } catch (_) {
    config = defaultConfigs;
  }
};
