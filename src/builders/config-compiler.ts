import fs from "fs";
import path from "path";
import { Constructor } from "@bonbons/di";
import { ConfigCompilerOptions } from "../options";
import { IConfigsCompiler } from "../services/ConfigReader";
import { InnerBaseCompiler } from "../typings/IConfigCompiler";

export function compileFn(options: Partial<ConfigCompilerOptions>) {
  const { enabled = false, force = false, configRoot, outRoot } = options;
  if (!enabled) return;
  try {
    const cwd = process.cwd();
    const configFolder = path.resolve(cwd, configRoot || "app/config");
    const outputFolder = path.resolve(cwd, outRoot || "config");
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
        const exports = require(sourcePath);
        if (!exports) return;
        let finalExports: any;
        let procedures: string[] = [];
        if (typeof exports === "function") {
          ({ finalExports, procedures } = readExcus(
            exports,
            finalExports,
            procedures
          ));
        } else if (typeof exports === "object") {
          const { default: excuClass } = exports;
          if (typeof excuClass !== "function") {
            finalExports = exports;
          } else {
            ({ finalExports, procedures } = readExcus(
              excuClass,
              finalExports,
              procedures
            ));
          }
        } else {
          finalExports = exports;
        }
        const preRuns = ["// [astroboy.ts] 自动生成的代码", ...procedures];
        const fileOutputStr = connectExports(preRuns.join("\n"), finalExports);
        fs.appendFileSync(
          compiledPath,
          // 解析表达式语法
          resolveExpressions(fileOutputStr),
          { flag: "w" }
        );
        compileds.push(compiledPath);
      });
    return compileds;
  } catch (error) {
    throw error;
  }
}

function readExcus(
  excuClass: Constructor<any>,
  finalExports: any,
  procedures: string[]
) {
  const {
    modules = {},
    functions = [],
    consts = {}
  } = excuClass.prototype as InnerBaseCompiler<any>;
  const sections: string[] = [];
  Object.keys(modules).forEach(name =>
    sections.push(`const ${name} = require("${modules[name]}");`)
  );
  Object.keys(consts).forEach(name =>
    sections.push(
      `const ${name} = ${
        typeof consts[name] === "function"
          ? consts[name].toString()
          : JSON.stringify(consts[name], null, "  ")
      };`
    )
  );
  (functions || []).forEach(func => sections.push(func.toString()));
  const exec: IConfigsCompiler<any> = new excuClass();
  finalExports = exec.configs(process);
  procedures = (exec.procedures && exec.procedures(process)) || [];
  procedures = [...sections, ...procedures];
  return { finalExports, procedures };
}

function connectExports(preRuns: string, finalExports: any) {
  return `${preRuns}\nmodule.exports = ${JSON.stringify(
    readExpressions(finalExports),
    null,
    "  "
  )}`;
}

function resolveExpressions(fileOutputStr: string): any {
  return fileOutputStr.replace(
    /['"`]{1}@expression::Symbol\((.+)\)['"`]{1}/g,
    function($0, $1) {
      // 恢复格式问题
      return $1.replace(/\\/g, "");
    }
  );
}

function readExpressions(target: any) {
  if (typeof target === "object") {
    for (const k in target) {
      if (typeof target[k] === "object") {
        target[k] = readExpressions(target[k]);
      } else if (typeof target[k] === "symbol") {
        target[k] = `@expression::${target[k].toString()}`;
      }
    }
  }
  return target;
}
