import path from "path";
import { ICmdOptions } from "./options";
import tsnode from "ts-node";
import chalk from "chalk";

export = function (command: ICmdOptions) {
  if (!tsnode) {
    console.log(chalk.red("ts-node is not found."));
    return;
  }
  const projectRoot = process.cwd();
  const controllerPath = path.resolve(projectRoot, "app/controllers");
  const routersPath = path.resolve(projectRoot, "app/routers");
  const enabled = command.enabled === undefined ? true : String(command.enabled) === "true";
  process.env.CTOR_PATH = controllerPath;
  process.env.ROUTER_PATH = routersPath;
  process.env.ASTT_ENABLED = String(enabled);
  process.env.ASTT_ALWAYS = String(command.always);
  process.env.APP_ROOT = command.approot || "/";
  process.env.FILE_TYPE = command.filetype || "js";
  tsnode.register({
    project: command.tsconfig || undefined
  });
  require("./init");
};

