"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configs_1 = require("../services/Configs");
exports.defaultRouterOptions = {
    routerAutoBuild: false,
    routerAlwaysBuild: false,
    ctorFolder: "app/controllers",
    routerFolder: "app/routers",
    routerRoot: "/",
    fileType: "js"
};
exports.ROUTER_OPTIONS = Configs_1.createOptions("ROUTER_OPTIONS");
//# sourceMappingURL=router.options.js.map