import path from "path";
import fs from "fs";
import rimraf from "rimraf";
import { loadProgramConfig, createProgram } from "../utils/typeCheck";

export interface MiddlewareCompilerOptions {
  /** tsconfig, 默认：`undefined` */
  tsconfig?: string;
  /** 是否自动编译configs文件夹，默认：`false` */
  enabled: boolean;
  /** 是否强制编译configs文件夹，默认：`false` */
  force: boolean;
  /** class-middlewares文件夹的相对位置，默认：`'app/middlewares/class'` */
  rootFolder?: string;
  /** middlewares编译后的输出位置，默认：`'app/middlewares'` */
  outFolder?: string;
}

export const defaultConfigCompilerOptions: MiddlewareCompilerOptions = {
  enabled: false,
  force: false,
  tsconfig,
  rootFolder: "app/middlewares/class",
  outFolder: "app/middlewares"
};

export function middlewareCompileFn(
  options: Partial<MiddlewareCompilerOptions>
) {
  const { enabled = false, force = false, rootFolder, outFolder } = options;
  if (!enabled) return;
  try {
    const cwd = process.cwd();
    const middleRootFolder = path.resolve(
      cwd,
      rootFolder || "app/middlewares/class"
    );
    const outputFolder = path.resolve(cwd, outFolder || "app/middlewares");
    if (!fs.existsSync(middleRootFolder)) fs.mkdirSync(middleRootFolder);
    const files = fs.readdirSync(middleRootFolder);
    if (!!force && fs.existsSync(outputFolder)) {
      if (middleRootFolder === outputFolder) {
        throw new Error(
          "Middleware-Compiler Error: same root-folder and out-folder is invalid when [force] option is opened."
        );
      }
      // 硬核开关，强撸中间件文件夹
      const exists = fs.readdirSync(outputFolder);
      exists
        .filter(p => p.endsWith(".js"))
        .forEach(p => {
          fs.unlinkSync(`${outputFolder}/${p}`);
        });
    } else if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    const compileds: string[] = [];
    const options = loadProgramConfig(tsconfig, { noEmit: true });
    files
      .filter(p => p.endsWith(".ts"))
      .forEach(filePath => {
        if (filePath.endsWith(".d.ts")) return;
        const sourcePath = `${middleRootFolder}/${filePath}`;
        const compiledPath = `${outputFolder}/${filePath.replace(
          ".ts",
          ".js"
        )}`;
        if (fs.existsSync(compiledPath)) return;
        // TODO
        const program = createProgram({ ...options, fileNames: [filePath] });
        const result = program.getSourceFiles();
        console.log(result);
        compileds.push(compiledPath);
      });
    return compileds;
  } catch (error) {
    throw error;
  }
}
