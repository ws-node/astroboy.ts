"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const astroboy_router_1 = require("astroboy-router");
const inject_server_1 = require("../inject-server");
function Controller(prefix) {
    return function (target) {
        const prototype = target.prototype;
        prototype.__valid = true;
        const implement = class extends target {
            constructor(_) {
                super(...((di_1.getDependencies(target) || []).map(i => inject_server_1.GlobalDI.get(i))));
                this.ctx = _;
            }
        };
        astroboy_router_1.Router(prefix)(target);
        inject_server_1.GlobalImplements.set(implement, target);
        return implement;
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map