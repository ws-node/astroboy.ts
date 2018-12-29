"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const options_1 = require("../options");
const Context_1 = require("../services/Context");
const simple_logger_1 = require("../plugins/simple-logger");
const env_config_1 = require("../configs/env.config");
const Render_1 = require("../services/Render");
/**
 * ## Body渲染约定的实现
 * * 按照约定将模板渲染到body相应中
 * @description
 * @author Big Mogician
 * @export
 * @class RenderResult
 * @implements {IResult}
 */
class RenderResult {
    constructor(value) {
        this.configs = typeof value === "string" ? { path: value } : value;
    }
    /** 框架调用，请勿手动调用 */
    toResult({ injector, configs }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { ctx } = injector.get(Context_1.Context);
            const opts = merge_1.default({}, configs.get(options_1.RENDER_RESULT_OPTIONS) || {}, this.configs || {});
            const { root, path: xpath, tplStr, engines, astConf, engine: key, configs: confs, } = opts;
            if (astConf && !!astConf.use) {
                return yield ctx.render(xpath, astConf.state, astConf.configs);
            }
            const engine = injector.get(engines[key]);
            const path = !root ? xpath : `${root}/${xpath}`;
            try {
                return !tplStr ?
                    yield engine.render(path, confs) :
                    yield engine.renderString(tplStr, confs);
            }
            catch (e) {
                const logger = injector.get(simple_logger_1.SimpleLogger);
                const render = injector.get(Render_1.Render);
                const { ctx } = injector.get(Context_1.Context);
                const { env } = configs.get(env_config_1.ENV);
                const errroTitle = (e.name && `模板渲染错误: ${e.name}`) || "模板渲染错误";
                render.setView("__viewError", e);
                logger.debug(errroTitle, e);
                ctx.status = 500;
                const { path: errorPath, tplStr: errorTpl, content } = env === "production" ? opts.onError : opts.onDevError;
                if (errorPath)
                    return yield engine.render(errorPath, confs);
                if (errorTpl)
                    return yield engine.renderString(errorTpl, confs);
                return (content && content(e)) || "Internal Server Error";
            }
        });
    }
}
exports.RenderResult = RenderResult;
//# sourceMappingURL=render.js.map