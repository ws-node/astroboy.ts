"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const options_1 = require("../options");
const Context_1 = require("../services/Context");
class RenderResult {
    constructor(value) {
        this.configs = typeof value === "string" ? { path: value } : value;
    }
    toResult({ injector, configs }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { ctx } = injector.get(Context_1.Context);
            const { path, tplStr, state, engines, astConf, engine: key, configs: confs, } = merge_1.default({}, configs.get(options_1.RENDER_RESULT_OPTIONS) || {}, this.configs || {});
            if (astConf && !!astConf.use) {
                return yield ctx.render(path, state, astConf.configs);
            }
            const engine = injector.get(engines[key]);
            return !tplStr ?
                yield engine.render(path, confs) :
                yield engine.renderString(tplStr, confs);
        });
    }
}
exports.RenderResult = RenderResult;
//# sourceMappingURL=render.js.map