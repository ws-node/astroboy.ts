import path from "path";
import fs from "fs";
import ts from "typescript";
import { loadProgramConfig, createProgram } from "../utils/type-check";
import {
  ICompileContext,
  compileForEach,
  IFuncParam,
  ImportsHelper
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
    const EXTENSIONS = !!force ? ".ts" : "js";
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
        .filter(p => p.endsWith(".js") || p.endsWith(EXTENSIONS))
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
          EXTENSIONS
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
        if (!finalExports.name) {
          throw new Error(
            "Middleware-Compiler Error: exported function must have a name."
          );
        }
        const exportStr = (!!force ? createTsFile : createJsFile)(
          otherFuncs,
          finalExports,
          context
        );
        fs.appendFileSync(compiledPath, exportStr, { flag: "w" });
        compileds.push(compiledPath);
      });
    return compileds;
  } catch (error) {
    throw error;
  }
}

function createJsFile(
  otherFuncs: ((...args: any[]) => any)[],
  finalExports: (...args: any[]) => any,
  context: ICompileContext
) {
  const imports = ImportsHelper.toJsList(context);
  const targetFunc = context.functions[finalExports.name];
  const params =
    // index<0 没有类型
    (targetFunc &&
      targetFunc.params.filter(i => i.type !== "[unknown type]")) ||
    [];
  const procedures: string[] = [
    "// [astroboy.ts] 自动生成的代码",
    params.length > 0
      ? `const { injectScope } = require("astroboy.ts");`
      : undefined,
    ...imports,
    ...otherFuncs.map(i => i.toString()),
    finalExports.toString()
  ].filter(i => !!i);
  const actions: string[] = [
    createInjectActions(params, context),
    createAwaitMiddlewareAction(finalExports.name, params),
    "  await next();"
  ];
  const exportStr =
    params.length > 0
      ? createDIMiddleware(procedures, actions)
      : createCommonMiddleware(procedures, finalExports.name);
  return exportStr;
}

function createTsFile(
  otherFuncs: ((...args: any[]) => any)[],
  finalExports: (...args: any[]) => any,
  context: ICompileContext
) {
  const imports = ImportsHelper.toTsList(context);
  const targetFunc = context.functions[finalExports.name];
  const params =
    // index<0 没有类型
    (targetFunc &&
      targetFunc.params.filter(i => i.type !== "[unknown type]")) ||
    [];
  const procedures: string[] = [
    "// [astroboy.ts] 自动生成的代码",
    params.length > 0
      ? `import { injectScope } from "astroboy.ts";`
      : undefined,
    ...imports,
    ...otherFuncs.map(i => i.toString()),
    finalExports.toString()
  ].filter(i => !!i);
  const actions: string[] = [
    createInjectActions(params, context),
    createAwaitMiddlewareAction(finalExports.name, params),
    "  await next();"
  ];
  const exportStr =
    params.length > 0
      ? createDIMiddleware(procedures, actions, true)
      : createCommonMiddleware(procedures, finalExports.name, true);
  return exportStr;
}

function createCommonMiddleware(
  procedures: string[],
  funcName: string,
  isTs = false
) {
  if (isTs) {
    return `${procedures.join("\n")}\nexport = () => ${funcName};`;
  }
  return `${procedures.join("\n")}\nmodule.exports = () => ${funcName};`;
}

function createDIMiddleware(
  procedures: string[],
  actions: string[],
  isTs = false
) {
  if (isTs) {
    return `${procedures.join(
      "\n"
    )}\nexport = () => injectScope(async ({ injector, next }: any) => {\n${actions.join(
      "\n"
    )}\n});`;
  }
  return `${procedures.join(
    "\n"
  )}\nmodule.exports = () => injectScope(async ({ injector, next }) => {\n${actions.join(
    "\n"
  )}\n});`;
}

function createInjectActions(params: IFuncParam[], context: ICompileContext) {
  return params
    .map(p => {
      const typeName = p.typeName;
      let result: string;
      if (p.type === "directType") {
        result = resolveIdentity(typeName, context);
      } else {
        result = `${resolveIdentity(p.namespace, context, typeName)}`;
      }
      return `  const _p${p.paramIndex} = injector.get(${result});`;
    })
    .join("\n");
}

function resolveIdentity(
  typeName: string,
  context: ICompileContext,
  replace?: string
) {
  const target = Object.keys(context.imports)
    .map(i => context.imports[i])
    .find(i => i.name.includes(typeName));
  if (target) {
    return `${target.identity}${
      target.type === "importNamespace" ? ".default." : "."
    }${replace || typeName}`;
  }
  return "";
  // throw new Error("Middleware-Compiler Error: resolve inject token failed.");
}

function createAwaitMiddlewareAction(
  middlewareName: string,
  params: IFuncParam[]
) {
  return `  await ${middlewareName}(${params
    .map(p => `_p${p.paramIndex}`)
    .join(", ")});`;
}
