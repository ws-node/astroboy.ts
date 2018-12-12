"use strict";
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const ts_node_1 = tslib_1.__importDefault(require("ts-node"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
module.exports = function (command) {
    if (!ts_node_1.default) {
        console.log(chalk_1.default.red("ts-node is not found."));
        return;
    }
    const projectRoot = process.cwd();
    const controllerPath = path_1.default.resolve(projectRoot, "app/controllers");
    const routersPath = path_1.default.resolve(projectRoot, "app/routers");
    const enabled = command.enabled === undefined ? true : String(command.enabled) === "true";
    process.env.CTOR_PATH = controllerPath;
    process.env.ROUTER_PATH = routersPath;
    process.env.ASTT_ENABLED = String(enabled);
    process.env.ASTT_ALWAYS = String(command.always);
    process.env.APP_ROOT = command.approot || "/";
    process.env.FILE_TYPE = command.filetype || "js";
    ts_node_1.default.register({
        project: command.tsconfig || undefined
    });
    require("./init");
};
//# sourceMappingURL=actions.js.map