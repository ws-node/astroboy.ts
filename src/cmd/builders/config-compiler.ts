import fs from "fs";
import path from "path";
import ts from "typescript";
import { loadProgramConfig, createProgram } from "../utils/type-check";
import {
  ICompileContext,
  compileForEach,
  ImportsHelper
} from "../utils/ast-compiler";

export interface InnerConfigCompilerOptions extends ConfigCompilerOptions {
  // TO DO
}

export interface ConfigCompilerOptions {
  /** tsconfig, 默认：`undefined` */
  tsconfig?: string;
  /** 是否自动编译configs文件夹，默认：`false` */
  enabled: boolean;
  /** 是否强制编译configs文件夹，默认：`false` */
  force: boolean;
  /** 整个configs文件夹的相对位置，默认：`'config'` */
  configRoot?: string;
  /** 整个configs文件夹编译后的输出位置，默认：`'config'` */
  outRoot?: string;
}

export const defaultConfigCompilerOptions: ConfigCompilerOptions = {
  tsconfig: undefined,
  enabled: false,
  force: false,
  configRoot: "app/config",
  outRoot: "config"
};

export function compileFn(options: Partial<ConfigCompilerOptions>) {
  const {
    enabled = false,
    force = false,
    configRoot,
    outRoot,
    tsconfig
  } = options;
  if (!enabled) return;
  try {
    const cwd = process.cwd();
    const configFolder = path.resolve(
      cwd,
      configRoot || defaultConfigCompilerOptions.configRoot
    );
    const outputFolder = path.resolve(
      cwd,
      outRoot || defaultConfigCompilerOptions.outRoot
    );
    if (!fs.existsSync(configFolder)) fs.mkdirSync(configFolder);
    const files = fs.readdirSync(configFolder);
    if (!!force && fs.existsSync(outputFolder)) {
      if (configFolder === outputFolder) {
        throw new Error(
          "Config-Compiler Error: same config-root and output-root is invalid when [force] option is opened."
        );
      }
      // 硬核开关，强撸config文件夹
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
    const options = loadProgramConfig(tsconfig, {
      noEmit: true,
      skipLibCheck: true
    });
    let program: ts.Program;
    files
      .filter(p => p.endsWith(".ts"))
      .forEach(filePath => {
        if (filePath.endsWith(".d.ts")) return;
        const sourcePath = `${configFolder}/${filePath}`;
        const compiledPath = `${outputFolder}/${filePath.replace(
          ".ts",
          ".js"
        )}`;
        if (fs.existsSync(compiledPath)) return;
        program = createProgram(
          {
            ...options,
            fileNames: [sourcePath]
          },
          program
        );
        const file = program.getSourceFile(sourcePath);
        const context: ICompileContext = {
          main: { root: configFolder, out: outputFolder },
          imports: {},
          functions: {},
          exports: {}
        };
        compileForEach(file, context);
        const exports = require(sourcePath);
        if (!exports) return;
        let finalExports: any;
        const procedures: string[] = [];
        if (typeof exports === "function") {
          finalExports = exports;
        } else if (typeof exports === "object") {
          const { default: excuClass, ...others } = exports;
          if (typeof excuClass !== "function") {
            throw new Error(
              "Config-Compiler Error: default exports must be a function."
            );
          } else {
            finalExports = excuClass;
            Object.keys(others || {}).forEach(name => {
              if (typeof others[name] === "function" && !!others[name].name) {
                procedures.push(others[name].toString());
              }
            });
          }
        } else {
          throw new Error(
            "Config-Compiler Error: exports must be a function or object."
          );
        }
        const imports = ImportsHelper.toList(context, "js");
        const preRuns = [
          "// [astroboy.ts] 自动生成的代码",
          ...imports,
          ...procedures
        ];
        const fileOutputStr = `${preRuns.join(
          "\n"
        )}\nmodule.exports = (${finalExports.toString()})();`;
        fs.appendFileSync(compiledPath, fileOutputStr, { flag: "w" });
        compileds.push(compiledPath);
      });
    return compileds;
  } catch (error) {
    throw error;
  }
}
