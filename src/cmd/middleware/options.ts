import fn from "./actions";
import { CommandPlugin } from "../base";

export interface IMiddlewareCmdOptions {
  force?: boolean;
  config?: string;
}

export const options: CommandPlugin = {
  name: "middleware",
  description: "编译middlewares文件",
  options: [["-F, --force", "清除所有middlewares，并重新编译"]],
  action: fn,
  help: () => {
    console.log("");
    console.log("  Examples:");
    console.log("");
    console.log("    $ atc middleware");
    console.log("    $ atc middleware --force");
    console.log();
  }
};
