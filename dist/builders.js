"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = require("./utils");
function initRouters({ ctorFolder: base, routerFolder: routerBase, routerAutoBuild: open, routerRoot: root }) {
    if (open) {
        const ctorPath = path_1.default.resolve(base);
        const routerPath = path_1.default.resolve(routerBase);
        checkRouterFolders(routerPath, fs_1.default.readdirSync(ctorPath), ctorPath, routerPath, root);
    }
}
exports.initRouters = initRouters;
function checkRouterFolders(baseRouter, folders, ctorPath, routerPath, root) {
    folders.forEach(path => {
        if (path.indexOf(".") === -1) {
            const routerFolder = `${routerPath}/${path}`;
            const ctorFolder = `${ctorPath}/${path}`;
            if (!fs_1.default.existsSync(routerFolder)) {
                fs_1.default.mkdirSync(routerFolder);
            }
            checkRouterFolders(baseRouter, fs_1.default.readdirSync(ctorFolder), ctorFolder, routerFolder, root);
        }
        else {
            if (checkIfOnlyDeclares(path))
                return;
            createTsRouterFile(baseRouter, ctorPath, routerPath, path, root);
        }
    });
}
function checkIfOnlyDeclares(p) {
    return p.endsWith(".d.ts");
}
function createTsRouterFile(baseRouter, ctorPath, routerPath, path, urlRoot) {
    try {
        // 存在手动配置的router.ts，则不做处理直接退出
        if (path.endsWith(".ts") && fs_1.default.existsSync(`${routerPath}/${path}`))
            return;
        // 尝试按照新版逻辑解析Controller
        const commonName = path.split(".")[0];
        console.log(`${ctorPath}/${commonName}`);
        const controller = require(`${ctorPath}/${commonName}`);
        // 找不到router源定义，静默退出
        if (!controller.prototype["@router"])
            return;
        const sourceCtor = utils_1.GlobalImplements.get(controller);
        // 无法解析控制器数据，则判断是老版本的Router
        if (!sourceCtor)
            return;
        const controllerName = routerPath === baseRouter ?
            commonName :
            `${routerPath.replace(`${baseRouter}/`, "").replace(/\//g, ".")}.${commonName}`;
        const file = [
            "// [astroboy.ts] 自动生成的代码",
            "",
            `const CTOR = require('${`${ctorPath}/${commonName}`}');`,
            `const { buildRouter } = require("astroboy.ts");`,
            `module.exports = buildRouter(CTOR, "${controllerName}", "${urlRoot}");`
        ];
        const _PATH = `${routerPath}/${path.replace(".ts", ".js")}`;
        if (fs_1.default.existsSync(_PATH)) {
            const oldFile = fs_1.default.readFileSync(_PATH, { flag: "r" });
            // 存在router.js文件，且内容一致，不做处理直接退出
            if (oldFile.toString() === file.join("\n"))
                return;
        }
        // 复写router.js文件
        fs_1.default.appendFileSync(_PATH, file.join("\n"), { flag: "w" });
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=builders.js.map