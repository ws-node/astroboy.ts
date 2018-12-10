import fs from "fs";
import path from "path";
import { IENV } from "./configs/env.config";
import { GlobalImplements } from "./utils";

export function initRouters({
  ctorFolder: base,
  routerFolder: routerBase,
  routerAutoBuild: open,
  routerRoot: root
}: IENV) {
  if (open) {
    const ctorPath = path.resolve(base);
    const routerPath = path.resolve(routerBase);
    checkRouterFolders(
      routerPath,
      fs.readdirSync(ctorPath),
      ctorPath,
      routerPath,
      root
    );
  }
}

function checkRouterFolders(baseRouter: string, folders: string[], ctorPath: string, routerPath: string, root: string) {
  folders.forEach(path => {
    if (path.indexOf(".") === -1) {
      const routerFolder = `${routerPath}/${path}`;
      const ctorFolder = `${ctorPath}/${path}`;
      if (!fs.existsSync(routerFolder)) { fs.mkdirSync(routerFolder); }
      checkRouterFolders(
        baseRouter,
        fs.readdirSync(ctorFolder),
        ctorFolder,
        routerFolder,
        root
      );
    }
    else {
      if (checkIfOnlyDeclares(path)) return;
      createTsRouterFile(baseRouter, ctorPath, routerPath, path, root);
    }
  });
}

function checkIfOnlyDeclares(p: string): any {
  return p.endsWith(".d.ts");
}

function createTsRouterFile(baseRouter: string, ctorPath: string, routerPath: string, path: string, urlRoot: string) {
  try {
    // 存在手动配置的router.ts，则不做处理直接退出
    if (path.endsWith(".ts") && fs.existsSync(`${routerPath}/${path}`)) return;
    // 尝试按照新版逻辑解析Controller
    const commonName = path.split(".")[0];
    console.log(`${ctorPath}/${commonName}`);
    const controller = require(`${ctorPath}/${commonName}`);
    // 找不到router源定义，静默退出
    if (!controller.prototype["@router"]) return;
    const sourceCtor = GlobalImplements.get(controller);
    // 无法解析控制器数据，则判断是老版本的Router
    if (!sourceCtor) return;
    const controllerName = routerPath === baseRouter ?
      commonName :
      `${routerPath.replace(`${baseRouter}/`, "").replace(/\//g, ".")}.${commonName}`;
    const file: string[] = [
      "// [astroboy.ts] 自动生成的代码",
      "",
      `const CTOR = require('${`${ctorPath}/${commonName}`}');`,
      `const { buildRouter } = require("astroboy.ts");`,
      `module.exports = buildRouter(CTOR, "${controllerName}", "${urlRoot}");`
    ];
    const _PATH = `${routerPath}/${path.replace(".ts", ".js")}`;
    if (fs.existsSync(_PATH)) {
      const oldFile = fs.readFileSync(_PATH, { flag: "r" });
      // 存在router.js文件，且内容一致，不做处理直接退出
      if (oldFile.toString() === file.join("\n")) return;
    }
    // 复写router.js文件
    fs.appendFileSync(_PATH, file.join("\n"), { flag: "w" });
  } catch (e) {
    throw e;
  }
}
