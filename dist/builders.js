"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const rimraf_1 = tslib_1.__importDefault(require("rimraf"));
const utils_1 = require("./utils");
const router_options_1 = require("./configs/router.options");
function initRouters({ ctorFolder: base = router_options_1.defaultRouterOptions.ctorFolder, routerFolder: routerBase = router_options_1.defaultRouterOptions.routerFolder, routerAutoBuild: open = router_options_1.defaultRouterOptions.routerAutoBuild, routerAlwaysBuild: always = router_options_1.defaultRouterOptions.routerAlwaysBuild, routerRoot: root = router_options_1.defaultRouterOptions.routerRoot, fileType = router_options_1.defaultRouterOptions.fileType }) {
    if (open) {
        const ctorPath = path_1.default.resolve(base);
        const routerPath = path_1.default.resolve(routerBase);
        if (always) {
            // 硬核开关，强撸routers文件夹
            rimraf_1.default.sync(routerPath);
            fs_1.default.mkdirSync(routerPath);
        }
        else if (!fs_1.default.existsSync(routerPath)) {
            fs_1.default.mkdirSync(routerPath);
        }
        checkRouterFolders({
            turn: 0,
            baseRouter: routerPath,
            folders: fs_1.default.readdirSync(ctorPath),
            ctorPath,
            routerPath,
            fileType,
            root
        });
    }
}
exports.initRouters = initRouters;
function checkRouterFolders({ turn, baseRouter, folders, ctorPath, routerPath, fileType, root }) {
    folders.forEach(path => {
        if (path.indexOf(".") === -1) {
            const routerFolder = `${routerPath}/${path}`;
            const ctorFolder = `${ctorPath}/${path}`;
            if (!fs_1.default.existsSync(routerFolder)) {
                fs_1.default.mkdirSync(routerFolder);
            }
            checkRouterFolders({
                turn: turn + 1,
                baseRouter,
                folders: fs_1.default.readdirSync(ctorFolder),
                ctorPath: ctorFolder,
                routerPath: routerFolder,
                fileType,
                root
            });
        }
        else {
            if (checkIfOnlyDeclares(path))
                return;
            createTsRouterFile({ turn, baseRouter, ctorPath, routerPath, path, fileType, urlRoot: root });
        }
    });
}
function checkIfOnlyDeclares(p) {
    return p.endsWith(".d.ts");
}
function createTsRouterFile({ turn, baseRouter, ctorPath, routerPath, path, fileType, urlRoot }) {
    try {
        // 尝试按照新版逻辑解析Controller
        const commonName = path.split(".")[0];
        const controller = require(`${ctorPath}/${commonName}`);
        // 找不到router源定义，静默退出
        if (!controller.prototype["@router"])
            return;
        const sourceCtor = utils_1.GlobalImplements.get(controller);
        // 无法解析控制器数据，则判断是老版本的Router
        if (!sourceCtor)
            return;
        const file = createFile(routerPath, baseRouter, commonName, turn, fileType, urlRoot);
        const _PATH = `${routerPath}/${commonName}.${fileType}`;
        if (fs_1.default.existsSync(_PATH)) {
            const oldFile = fs_1.default.readFileSync(_PATH, { flag: "r" });
            const content = (oldFile.toString() || "").split("\n");
            // 存在router.js文件，且内容一致，不做处理直接退出
            if (content[1] === file[1] && content[3] === file[3])
                return;
        }
        // 复写router.js文件
        fs_1.default.appendFileSync(_PATH, file.join("\n"), { flag: "w" });
    }
    catch (e) {
        throw e;
    }
}
function createFile(routerPath, baseRouter, commonName, turn, fileType, urlRoot) {
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
function createTsFile(turnStr, controllerName, urlRoot) {
    return [
        "// [astroboy.ts] 自动生成的代码",
        `import CTOR from "${turnStr}";`,
        `import { buildRouter } from "astroboy.ts";`,
        `export = buildRouter(CTOR, "${controllerName}", "${urlRoot}");`
    ];
}
function createJsFile(turnStr, controllerName, urlRoot) {
    return [
        "// [astroboy.ts] 自动生成的代码",
        `const CTOR = require("${turnStr}");`,
        `const { buildRouter } = require("astroboy.ts");`,
        `module.exports = buildRouter(CTOR, "${controllerName}", "${urlRoot}");`
    ];
}
//# sourceMappingURL=builders.js.map