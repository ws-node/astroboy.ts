import ts from "typescript";

export interface IFuncParam {
  name: string;
  type: "directType" | "namespaceType" | "[unknown type]";
  namespace?: string;
  typeName: string;
  paramIndex: number;
}

export interface ICompileContext {
  imports: {
    [name: string]: {
      type:
        | "moduleReference"
        | "importNamedConst"
        | "importStarBundle"
        | "importNamespace";
      reference: string;
      name: string[];
      identity: string;
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

export function compileForEach(node: ts.Node, context: ICompileContext) {
  switch (node.kind) {
    case ts.SyntaxKind.ImportEqualsDeclaration:
    case ts.SyntaxKind.ImportDeclaration:
      resolveImports(context, node);
      break;
    case ts.SyntaxKind.FunctionDeclaration:
      resolveFunctions(context, node);
      break;
    case ts.SyntaxKind.ExportAssignment:
    case ts.SyntaxKind.ExportDeclaration:
      resolveExports(context, node);
      break;
    case ts.SyntaxKind.EndOfFileToken:
    case ts.SyntaxKind.SourceFile:
    default:
      return ts.forEachChild(node, node => compileForEach(node, context));
  }
}

function resolveExports(context: ICompileContext, node: ts.Node) {
  const exports = (context["exports"] = context["exports"] || {});
  const thisExportsNode = <ts.ExpressionWithTypeArguments>node;
  const dLen = Object.keys(exports).filter(i =>
    i.startsWith("[dynamic exports")
  ).length;
  const name =
    thisExportsNode.expression["text"] || `[dynamic exports ${dLen}]`;
  exports[name] = { name };
}

function resolveFunctions(context: ICompileContext, node: ts.Node) {
  const functions = (context["functions"] = context["functions"] || {});
  const thisFuncNode = <ts.FunctionDeclaration>node;
  const isExports = (<any[]>(thisFuncNode["modifiers"] || []))
    .map((i: ts.Modifier) => i.kind)
    .includes(ts.SyntaxKind.ExportKeyword);
  const dLen = Object.keys(functions).filter(i =>
    i.startsWith("[dynamic function")
  ).length;
  const name = !thisFuncNode.name
    ? `[dynamic function ${dLen + 1}]`
    : thisFuncNode.name.text;
  if (isExports) {
    const exports = (context["exports"] = context["exports"] || {});
    exports[name] = { name };
  }
  const thisFunc: { name: string; params: IFuncParam[] } = (functions[name] = {
    name,
    params: []
  });
  (thisFuncNode.parameters || []).forEach(
    (param: ts.ParameterDeclaration, index: number) => {
      if (!param.type || !param.type["typeName"]) {
        return thisFunc.params.push({
          name: (<ts.Identifier>param.name).text,
          type: "[unknown type]",
          namespace: "[unknown namespace]",
          typeName: "[unknown typeName]",
          paramIndex: index
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
}

function resolveImports(context: ICompileContext, node: ts.Node) {
  const imports = (context["imports"] = context["imports"] || {});
  if (Object.keys(imports).length === 0) {
    imports["tslib_1"] = {
      type: "moduleReference",
      name: ["tslib"],
      identity: "tslib_1",
      reference: "tslib"
    };
  }
  if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
    const thisNode = <ts.ImportEqualsDeclaration>node;
    const reference =
      (<ts.ExternalModuleReference>thisNode.moduleReference).expression[
        "text"
      ] || "";
    const identity = getIdentity(reference, context);
    imports[identity] = {
      type: "moduleReference",
      name: [thisNode.name.text],
      identity,
      reference
    };
  } else {
    const thisNode = <ts.ImportDeclaration>node;
    const namedBindings = thisNode.importClause.namedBindings!;
    if (namedBindings) {
      if (!(<ts.NamedImports>namedBindings).elements) {
        const current = <ts.NamespaceImport>namedBindings;
        const reference = thisNode.moduleSpecifier["text"] || "";
        const identity = getIdentity(reference, context);
        imports[identity] = {
          type: "importStarBundle",
          name: [current.name.text],
          identity,
          reference
        };
      } else {
        const reference = thisNode.moduleSpecifier["text"] || "";
        const identity = getIdentity(reference, context);
        imports[identity] = {
          type: "importNamedConst",
          name: [],
          identity,
          reference
        };
        (<ts.NamedImports>namedBindings).elements.forEach(each => {
          imports[identity].name.push(each.name.text);
        });
      }
    } else {
      const current = thisNode.importClause;
      const reference = thisNode.moduleSpecifier["text"] || "";
      const identity = getIdentity(reference, context);
      imports[identity] = {
        type: "importNamespace",
        name: [current.name.text],
        identity,
        reference
      };
    }
  }
}

function getIdentity(reference: string, context?: ICompileContext) {
  const idx = (reference || "").lastIndexOf("/");
  const lastTail = (reference || "").slice(idx + 1) || "";
  const temp_id = normalize(lastTail);
  const count = Object.keys(context.imports).filter(i => i.startsWith(temp_id))
    .length;
  return `${temp_id}_${count + 1}`;
}

function normalize(value: string) {
  return value.replace(/\./g, "_").replace(/\-/g, "_");
}

export const ImportsHelper = {
  toJsList(context: ICompileContext) {
    return Object.keys(context.imports).map(id => {
      const current = context.imports[id];
      switch (current.type) {
        case "moduleReference":
          return `const ${current.identity} = require("${current.reference}");`;
        case "importNamedConst":
          return `const ${current.identity} = require("${current.reference}");`;
        case "importNamespace":
          return `const ${
            current.identity
          } = tslib_1.__importDefault(require("${current.reference}"));`;
        case "importStarBundle":
          return `const ${current.identity} = tslib_1.__importStar(require("${
            current.reference
          }"));`;
      }
    });
  },

  toTsList(context: ICompileContext) {
    return Object.keys(context.imports)
      .filter(n => n !== "tslib_1")
      .map(id => {
        const current = context.imports[id];
        switch (current.type) {
          case "moduleReference":
            return `import ${current.identity} = require("${
              current.reference
            }");`;
          case "importNamedConst":
            return `import ${current.identity} = require("${
              current.reference
            }");`;
          case "importNamespace":
            return `import ${current.identity} from "${current.reference}";`;
          case "importStarBundle":
            return `import * as ${current.identity} from "${
              current.reference
            }";`;
        }
      });
  }
};
