"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configs_1 = require("../services/Configs");
exports.defaultRouterOptions = {
    enabled: false,
    always: false,
    ctorFolder: "app/controllers",
    routerFolder: "app/routers",
    appRoot: "/",
    fileType: "js"
};
exports.ROUTER_OPTIONS = Configs_1.createOptions("ROUTER_OPTIONS");
//# sourceMappingURL=router.options.js.map