import chalk from "chalk";
import path from "path";
import { InnerCmdConfig } from "../base";

export function loadConfig(
  root: string,
  fileName: string | undefined,
  defaultName = "atc.config.js"
) {
  const _name = path.join(root, fileName || defaultName);
  let config: InnerCmdConfig;
  try {
    config = require(_name) || {};
  } catch (error) {
    // only check if throwing is an error.
    if (error.message && typeof error.message === "string") {
      // import errors occures.
      if (error.message.startsWith("Cannot find module")) {
        // use custom atc.config file.
        if (fileName === defaultName) {
          // maybe syntax error, throws.
          throw error;
        } else {
          // maybe filename error, throws.
          throw new Error(`未找到atc配置文件：[${_name}]`);
        }
      } else {
        // throws anyway.
        throw error;
      }
    }
    console.log(chalk.yellow("未配置atc配置文件, 使用默认配置"));
    config = {};
  }
  return config;
}
