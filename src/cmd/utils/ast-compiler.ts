import ts from "typescript";

export interface IFuncParam {
  name: string;
  type: "directType" | "namespaceType";
  namespace: string;
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

export function compileForEach(node: ts.Node, context: ICompileContext) {
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
          if (!param.type || !param.type["typeName"]) {
            return thisFunc.params.push({
              name: (<ts.Identifier>param.name).text,
              type: "unknown",
              namespace: "unknown",
              typeName: "unknown",
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
      return ts.forEachChild(node, node => compileForEach(node, context));
  }
}

export function resolveImportsToListString(context: ICompileContext) {
  return Object.keys(context.imports).map(name => {
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
}
