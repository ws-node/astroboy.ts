import fn from "./actions";
import { CommandPlugin } from "../base";

export interface IRouterCmdOptions {
  enabled?: boolean;
  always?: boolean;
  filetype?: string;
  approot?: string;
  details?: string;
  tsconfig?: string;
}

export const options: CommandPlugin = {
  name: "router",
  description: "astroboy.ts routers cmd",
  options: [
    ["--enabled [isEnabled]", "open routers-auto-build"],
    ["--always [isAlways]", "set routers-always-rebuild"],
    ["--filetype [fileType]", "set routers fileType"],
    ["--approot [appRoot]", "set routers-root"],
    ["--tsconfig [tsconfig]", "set tsconfig.json"],
    ["--details [showRouters]", "show building results or not"],
  ],
  action: fn,
  help: () => {
    console.log("");
    console.log("  Examples:");
    console.log("");
    console.log("    $ atc router");
    console.log("    $ atc router --always");
    console.log("    $ atc router --fileType ts");
    console.log("    $ atc router --approot /v1/prj");
    console.log();
  }
};