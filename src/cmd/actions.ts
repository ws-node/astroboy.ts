import { ICmdOptions } from "./options";
import { exec } from "child_process";
import chalk from "chalk";

export = function (_, command: ICmdOptions) {
  try {
    const tsnode = require.resolve("ts-node");
    console.log(chalk.blue("Start building routers ****** "));
    exec(`node -r ${tsnode.replace("/dist/index.js", "")}/register ./init`, (error) => {
      if (error) {
        console.log(chalk.yellow("初始化routers失败"));
        console.log(error);
        return;
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

