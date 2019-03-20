import fn from "./actions";
import { CommandPlugin } from "../base";

export interface IConfigCmdOptions {
  force?: boolean;
  config?: string;
}

export const options: CommandPlugin = {
  name: "config",
  description: "编译configs文件",
  options: [["-F, --force", "清除所有configs，并重新编译"]],
  action: fn,
  help: () => {
    console.log("");
    console.log("  Examples:");
    console.log("");
    console.log("    $ atc config");
    console.log("    $ atc config --force");
    console.log();
  }
};
