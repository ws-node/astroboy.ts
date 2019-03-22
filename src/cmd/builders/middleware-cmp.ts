import path from "path";
import fs from "fs";
import ts from "typescript";
import { loadProgramConfig, createProgram } from "../utils/type-check";
import {
  ICompileContext,
  compileForEach,
  IFuncParam,
  resolveImportsToListString
} from "../utils/ast-compiler";

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
  tsconfig: undefined,
  rootFolder: "app/middlewares/pipes",
  outFolder: "app/middlewares"
};

export function middlewareCompileFn(
  options: Partial<MiddlewareCompilerOptions>
) {
  const {
    enabled = false,
    force = false,
    rootFolder,
    outFolder,
    tsconfig
  } = options;
  if (!enabled) return;
  try {
    const cwd = process.cwd();
    const middleRootFolder = path.resolve(
      cwd,
      rootFolder || defaultConfigCompilerOptions.rootFolder
    );
    const outputFolder = path.resolve(
      cwd,
      outFolder || defaultConfigCompilerOptions.outFolder
    );
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
    const options = loadProgramConfig(tsconfig, {
      noEmit: true,
      skipLibCheck: true
    });
    let program: ts.Program;
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
        program = createProgram(
          {
            ...options,
            fileNames: [sourcePath]
          },
          program
        );
        const file = program.getSourceFile(sourcePath);
        const context: ICompileContext = {
          imports: {},
          functions: {},
          exports: {}
        };
        compileForEach(file, context);
        const exportList = Object.keys(context.exports);
        if (exportList.length <= 0) return;
        const middlewareName = exportList[0];
        const exports = require(sourcePath);
        if (!exports) return;
        let finalExports: (...args: any[]) => any;
        const otherFuncs: Array<(...args: any[]) => any> = [];
        if (typeof exports !== "object" && typeof exports !== "function") {
          throw new Error(
            "Middleware-Compiler Error: a middleware function must be exported."
          );
        }
        if (typeof exports === "object") {
          const { default: excuClass, ...others } = exports;
          if (typeof excuClass !== "function") {
            throw new Error(
              "Middleware-Compiler Error: a middleware function must be exported."
            );
          } else {
            finalExports = excuClass;
            Object.keys(others || {}).forEach(name => {
              if (typeof others[name] === "function" && !!others[name].name) {
                otherFuncs.push(others[name].toString());
              }
            });
          }
        } else {
          finalExports = exports;
        }
        const imports = resolveImportsToListString(context);
        const params = context.functions[middlewareName].params;
        const procedures: string[] = [
          "// [astroboy.ts] 自动生成的代码",
          `const { injectScope } = require("astroboy.ts");`,
          ...imports,
          ...otherFuncs.map(i => i.toString()),
          finalExports.toString()
        ];
        const actions: string[] = [
          createInjectActions(params),
          createAwaitMiddlewareAction(middlewareName, params),
          "  await next();"
        ];
        const exportStr = `${procedures.join(
          "\n"
        )}\nmodule.exports = () => injectScope(async ({ injector, next }) => {\n${actions.join(
          "\n"
        )}\n});`;
        fs.appendFileSync(compiledPath, exportStr, { flag: "w" });
        compileds.push(compiledPath);
      });
    return compileds;
  } catch (error) {
    throw error;
  }
}

function createInjectActions(params: IFuncParam[]) {
  return params
    .map(
      p =>
        `  const _p${p.paramIndex} = injector.get(${
          p.type === "directType" ? p.typeName : `${p.namespace}.${p.typeName}`
        })`
    )
    .join("\n");
}

function createAwaitMiddlewareAction(
  middlewareName: string,
  params: IFuncParam[]
) {
  return `  await ${middlewareName}(${params
    .map(p => `_p${p.paramIndex}`)
    .join(", ")});`;
}
