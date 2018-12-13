"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const configs_1 = require("../configs");
const Context_1 = require("../services/Context");
class RenderResult {
    constructor(value) {
        this.configs = typeof value === "string" ? { path: value } : value;
    }
    toResult({ injector, configs }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { ctx } = injector.get(Context_1.Context);
            const _a = Object.assign({}, configs.get(configs_1.RENDER_RESULT_OPTIONS), this.configs), { path, state } = _a, options = tslib_1.__rest(_a, ["path", "state"]);
            return yield ctx.render(path, state, options);
        });
    }
}
exports.RenderResult = RenderResult;
//# sourceMappingURL=render.js.map