import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import { GlobalImplements } from "./utils";
import {
  InnerRouterOptions,
  defaultRouterOptions as df
} from "./configs/router.options";

export function initRouters({
  ctorFolder: base = df.ctorFolder,
  routerFolder: routerBase = df.routerFolder,
  enabled: open = df.enabled,
  always = df.always,
  appRoot: root = df.appRoot,
  fileType = df.fileType
}: Partial<InnerRouterOptions>) {
  if (open) {
    const ctorPath = path.resolve(base);
    const routerPath = path.resolve(routerBase);
    if (always) {
      // 硬核开关，强撸routers文件夹
      rimraf.sync(routerPath);
      fs.mkdirSync(routerPath);
    } else if (!fs.existsSync(routerPath)) {
      fs.mkdirSync(routerPath);
    }
    checkRouterFolders({
      turn: 0,
      baseRouter: routerPath,
      folders: fs.readdirSync(ctorPath),
      ctorPath,
      routerPath,
      fileType,
      root
    });
  }
}

function checkRouterFolders({ turn, baseRouter, folders, ctorPath, routerPath, fileType, root }: {
  turn: number;
  baseRouter: string;
  folders: string[];
  ctorPath: string;
  routerPath: string;
  fileType: string;
  root: string;
}) {
  folders.forEach(path => {
    if (path.indexOf(".") === -1) {
      const routerFolder = `${routerPath}/${path}`;
      const ctorFolder = `${ctorPath}/${path}`;
      if (!fs.existsSync(routerFolder)) { fs.mkdirSync(routerFolder); }
      checkRouterFolders({
        turn: turn + 1,
        baseRouter,
        folders: fs.readdirSync(ctorFolder),
        ctorPath: ctorFolder,
        routerPath: routerFolder,
        fileType,
        root
      });
    }
    else {
      if (checkIfOnlyDeclares(path)) return;
      createTsRouterFile({ turn, baseRouter, ctorPath, routerPath, path, fileType, urlRoot: root });
    }
  });
}

function checkIfOnlyDeclares(p: string): any {
  return p.endsWith(".d.ts");
}

function createTsRouterFile({ turn, baseRouter, ctorPath, routerPath, path, fileType, urlRoot }: {
  turn: number;
  baseRouter: string;
  ctorPath: string;
  routerPath: string;
  path: string;
  fileType: string;
  urlRoot: string;
}) {
  try {
    // 尝试按照新版逻辑解析Controller
    const commonName = path.split(".")[0];
    const controller = require(`${ctorPath}/${commonName}`);
    // 找不到router源定义，静默退出
    if (!controller.prototype["@router"]) return;
    const sourceCtor = GlobalImplements.get(controller);
    // 无法解析控制器数据，则判断是老版本的Router
    if (!sourceCtor) return;
    const file = createFile(routerPath, baseRouter, commonName, turn, fileType, urlRoot);
    const _PATH = `${routerPath}/${commonName}.${fileType}`;
    if (fs.existsSync(_PATH)) {
      const oldFile = fs.readFileSync(_PATH, { flag: "r" });
      const content = (oldFile.toString() || "").split("\n");
      // 存在router.js文件，且内容一致，不做处理直接退出
      if (content[1] === file[1] && content[3] === file[3]) return;
    }
    // 复写router.js文件
    fs.appendFileSync(_PATH, file.join("\n"), { flag: "w" });
  } catch (e) {
    throw e;
  }
}

function createFile(routerPath: string, baseRouter: string, commonName: string, turn: number, fileType: string, urlRoot: string) {
  const controllerName = routerPath === baseRouter ?
    commonName :
    `${routerPath.replace(`${baseRouter}/`, "").replace(/\//g, ".")}.${commonName}`;
  const turnLod = [".."];
  for (let index = 0; index < turn; index++) {
    turnLod.push("..");
  }
  const turnStr = routerPath === baseRouter ?
    `${turnLod.join("/")}/controllers/${commonName}` :
    `${turnLod.join("/")}/controllers/${routerPath.replace(`${baseRouter}/`, "")}/${commonName}`;
  const file = fileType === "ts" ?
    createTsFile(turnStr, controllerName, urlRoot) :
    createJsFile(turnStr, controllerName, urlRoot);
  return file;
}

function createTsFile(turnStr: string, controllerName: string, urlRoot: string): string[] {
  return [
    "// [astroboy.ts] 自动生成的代码",
    `import CTOR from "${turnStr}";`,
    `import { buildRouter } from "astroboy.ts";`,
    `export = buildRouter(CTOR, "${controllerName}", "${urlRoot}");`
  ];
}

function createJsFile(turnStr: string, controllerName: string, urlRoot: string): string[] {
  return [
    "// [astroboy.ts] 自动生成的代码",
    `const CTOR = require("${turnStr}");`,
    `const { buildRouter } = require("astroboy.ts");`,
    `module.exports = buildRouter(CTOR, "${controllerName}", "${urlRoot}");`
  ];
}

