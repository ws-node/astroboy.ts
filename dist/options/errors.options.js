"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Configs_1 = require("../services/Configs");
const render_1 = require("../results/render");
const render_options_1 = require("./render.options");
const env_config_1 = require("../configs/env.config");
const Context_1 = require("../services/Context");
const Render_1 = require("../services/Render");
const simple_logger_1 = require("../plugins/simple-logger");
exports.defaultGlobalError = {
    handler: (error, injector, configs) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const render = injector.get(Render_1.Render);
        const { ctx } = injector.get(Context_1.Context);
        const { env } = configs.get(env_config_1.ENV);
        const { onError, onDevError } = configs.get(render_options_1.RENDER_RESULT_OPTIONS);
        const _a = env === "production" ? onError : onDevError, { content: defaultRender } = _a, args = tslib_1.__rest(_a, ["content"]);
        render.setView("__viewError", error);
        try {
            const path = !args.path ? undefined : args.path;
            const tpl = !args.tplStr ? undefined : args.tplStr;
            if (!path && !tpl)
                throw new Error("No template provided for global error handler.");
            const result = new render_1.RenderResult({ path, tplStr: tpl });
            ctx.body = yield result.toResult({ injector, configs });
        }
        catch (_) {
            const logger = injector.get(simple_logger_1.SimpleLogger);
            logger.trace("GLOBAL_ERROR render failed", _);
            ctx.body = defaultRender(error, "Internal Server Error");
        }
    })
};
exports.GLOBAL_ERROR = Configs_1.createOptions("GLOBAL_ERROR");
//# sourceMappingURL=errors.options.js.map