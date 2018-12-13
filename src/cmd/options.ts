
import fn from "./actions";

export interface ICmdOptions {
  enabled?: boolean;
  always?: boolean;
  filetype?: string;
  approot?: string;
  details?: string;
  tsconfig?: string;
}

export const options = {
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
    console.log("    $ astt router");
    console.log("    $ astt router --always");
    console.log("    $ astt router --fileType ts");
    console.log("    $ astt router --approot /v1/prj");
    console.log();
  }
};