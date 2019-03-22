import path from "path";
import fs from "fs";
import ts from "typescript";
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
        forEach(file, context);
        const exportList = Object.keys(context.exports);
        if (exportList.length <= 0) return;
        const middlewareName = exportList[0];
        const exports = require(sourcePath);
        if (!exports) return;
        let finalExports: (...args: any[]) => any;
        if (typeof exports !== "object" && typeof exports !== "function") {
          throw new Error(
            "Middleware-Compiler Error: a middleware function must be exported."
          );
        }
        if (typeof exports === "object") {
          const { default: excuClass } = exports;
          if (typeof excuClass !== "function") {
            throw new Error(
              "Middleware-Compiler Error: a middleware function must be exported."
            );
          } else {
            finalExports = excuClass;
          }
        } else {
          finalExports = exports;
        }
        const imports = Object.keys(context.imports).map(name => {
          const current = context.imports[name];
          if (
            current.type === "moduleReference" ||
            current.type === "importStarBundle"
          ) {
            return `const ${name} = require("${current.reference}");`;
          } else if (current.type === "importNamespace") {
            return `const ${name} = require("${current.reference}").default;`;
          } else if (current.type === "importNamedConst") {
            return `const { ${name} } = require("${current.reference}");`;
          }
        });
        const params = context.functions[middlewareName].params;
        const procedures: string[] = [
          "// [astroboy.ts] 自动生成的代码",
          `const { injectScope } = require("astroboy.ts");`,
          ...imports,
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

function forEach(node: ts.Node, context: ICompileContext) {
  switch (node.kind) {
    case ts.SyntaxKind.ImportEqualsDeclaration:
    case ts.SyntaxKind.ImportDeclaration:
      const imports = (context["imports"] = context["imports"] || {});
      if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
        const thisNode = <ts.ImportEqualsDeclaration>node;
        imports[thisNode.name.text] = {
          type: "moduleReference",
          name: thisNode.name.text,
          reference:
            (<ts.ExternalModuleReference>thisNode.moduleReference).expression[
              "text"
            ] || ""
        };
      } else {
        const thisNode = <ts.ImportDeclaration>node;
        const namedBindings = thisNode.importClause.namedBindings!;
        if (namedBindings) {
          if (!(<ts.NamedImports>namedBindings).elements) {
            const current = <ts.NamespaceImport>namedBindings;
            imports[current.name.text] = {
              type: "importStarBundle",
              name: current.name.text,
              reference: thisNode.moduleSpecifier["text"]
            };
          } else {
            (<ts.NamedImports>namedBindings).elements.forEach(each => {
              imports[each.name.text] = {
                type: "importNamedConst",
                name: each.name.text,
                reference: thisNode.moduleSpecifier["text"]
              };
            });
          }
        } else {
          const current = thisNode.importClause;
          imports[current.name.text] = {
            type: "importNamespace",
            name: current.name.text,
            reference: thisNode.moduleSpecifier["text"]
          };
        }
      }
      break;
    case ts.SyntaxKind.FunctionDeclaration:
      const functions = (context["functions"] = context["functions"] || {});
      const thisFuncNode = <ts.FunctionDeclaration>node;
      const isExports = (<any[]>(thisFuncNode["modifiers"] || []))
        .map((i: ts.Modifier) => i.kind)
        .includes(ts.SyntaxKind.ExportKeyword);
      if (isExports) {
        const exports = (context["exports"] = context["exports"] || {});
        exports[thisFuncNode.name.text] = {
          name: thisFuncNode.name.text
        };
      }
      const thisFunc = (functions[thisFuncNode.name.text] = {
        name: thisFuncNode.name.text,
        params: []
      });
      (thisFuncNode.parameters || []).forEach(
        (param: ts.ParameterDeclaration, index: number) => {
          if (!param.type) {
            return thisFunc.params.push({
              name: (<ts.Identifier>param.name).text,
              type: "unknown",
              namespace: "unknown",
              typeName: "unknown",
              paramIndex: -1
            });
          }
          if (param.type["typeName"].kind === ts.SyntaxKind.QualifiedName) {
            thisFunc.params.push({
              name: (<ts.Identifier>param.name).text,
              type: "namespaceType",
              namespace: param.type["typeName"].left.text,
              typeName: param.type["typeName"].right.text,
              paramIndex: index
            });
          } else {
            thisFunc.params.push({
              name: (<ts.Identifier>param.name).text,
              type: "directType",
              typeName: param.type["typeName"].text,
              paramIndex: index
            });
          }
        }
      );
      break;
    case ts.SyntaxKind.ExportAssignment:
    case ts.SyntaxKind.ExportDeclaration:
      const exports = (context["exports"] = context["exports"] || {});
      const thisExportsNode = <ts.ExpressionWithTypeArguments>node;
      exports[thisExportsNode.expression["text"]] = {
        name: thisExportsNode.expression["text"]
      };
      break;
    case ts.SyntaxKind.EndOfFileToken:
    case ts.SyntaxKind.SourceFile:
    default:
      return ts.forEachChild(node, node => forEach(node, context));
  }
}

interface IFuncParam {
  name: string;
  type: "directType" | "namespaceType";
  namespace: string;
  typeName: string;
  paramIndex: number;
}

interface ICompileContext {
  imports: {
    [name: string]: {
      type:
        | "moduleReference"
        | "importNamedConst"
        | "importStarBundle"
        | "importNamespace";
      reference: string;
      name: string;
    };
  };
  functions: {
    [name: string]: {
      name: string;
      params: Array<IFuncParam>;
    };
  };
  exports: {
    [name: string]: {
      name: string;
    };
  };
}
