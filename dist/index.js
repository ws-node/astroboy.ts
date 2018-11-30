"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./decorators/injectable"));
__export(require("./decorators/controller"));
__export(require("./inject-server"));
__export(require("astroboy-router"));
const astroboy_router_1 = require("astroboy-router");
const inject_server_1 = require("./inject-server");
function buildRouter(ctor, name, root) {
    return astroboy_router_1.createRouter(inject_server_1.GlobalImplements.get(ctor), name, root);
}
exports.buildRouter = buildRouter;
//# sourceMappingURL=index.js.map