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
        // const fileString = fs.readFileSync(sourcePath, { flag: "r" });
        const fileOutputStr = `module.exports = ${JSON.stringify(
          exports,
          null,
          "  "
        )}`;
        fs.appendFileSync(compiledPath, fileOutputStr, { flag: "w" });
      });
  } catch (e) {
    console.log(e);
  }
}
