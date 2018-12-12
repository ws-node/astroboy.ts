import path from "path";
import { ICmdOptions } from "./options";
import { preInitFn } from "../index";

export = function (command: ICmdOptions) {
  const projectRoot = process.cwd();
  const controllerPath = path.resolve(projectRoot, "app/controllers");
  const routersPath = path.resolve(projectRoot, "app/routers");
  const enabled = command.enabled === undefined ? true : String(command.enabled) === "true";
  preInitFn({
    enabled,
    always: String(command.always) === "true",
    fileType: <any>command.filetype || "js",
    appRoot: command.approot || "/",
    // @ts-ignore
    ctorFolder: controllerPath,
    routerFolder: routersPath
  });
};
