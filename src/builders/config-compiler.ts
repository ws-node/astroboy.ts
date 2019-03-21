import fs from "fs";
import path from "path";
import { ConfigCompilerOptions } from "../options";

export function compileFn(options: Partial<ConfigCompilerOptions>) {
  const { enabled = false, force = false, configRoot, outRoot } = options;
  if (!enabled) return;
  try {
    const configFolder = path.resolve(process.cwd(), configRoot || "config");
    const outputFolder = path.resolve(process.cwd(), outRoot || "config");
    const files = fs.readdirSync(configFolder);
    files
      .filter(p => p.endsWith(".ts"))
      .forEach(filePath => {
        if (filePath.endsWith(".d.ts")) return;
        const sourcePath = `${configFolder}/${filePath}`;
        const compiledPath = `${outputFolder}/${filePath.replace(
          ".ts",
          ".js"
        )}`;
        if (fs.existsSync(compiledPath) && !force) return;
        const exports = require(sourcePath);
        if (!exports) return;
        let finalExports: any;
        if (typeof exports === "function") {
          finalExports = new exports().configs(process);
        } else if (typeof exports === "object") {
          const { default: excuClass } = exports;
          if (typeof excuClass !== "function") return;
          finalExports = new excuClass().configs(process);
        } else {
          finalExports = exports;
        }
        const fileOutputStr = `module.exports = ${JSON.stringify(
          finalExports,
          null,
          "  "
        )}`;
        fs.appendFileSync(compiledPath, fileOutputStr, { flag: "w" });
      });
  } catch (e) {
    console.log(e);
  }
}
