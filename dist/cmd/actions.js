"use strict";
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const index_1 = require("../index");
module.exports = function (command) {
    const projectRoot = process.cwd();
    const controllerPath = path_1.default.resolve(projectRoot, "app/controllers");
    const routersPath = path_1.default.resolve(projectRoot, "app/routers");
    const enabled = command.enabled === undefined ? true : String(command.enabled) === "true";
    index_1.preInitFn({
        enabled,
        always: String(command.always) === "true",
        fileType: command.filetype || "js",
        appRoot: command.approot || "/",
        // @ts-ignore
        ctorFolder: controllerPath,
        routerFolder: routersPath
    });
};
//# sourceMappingURL=actions.js.map