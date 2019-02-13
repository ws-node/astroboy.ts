"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configs_1 = require("../services/Configs");
const nunjunks_1 = require("../plugins/nunjunks");
exports.defaultRenderResultOptions = {
    astConf: {
        use: false,
        configs: undefined,
        state: undefined
    },
    path: "",
    tplStr: undefined,
    root: undefined,
    configs: undefined,
    engine: "nunjunks",
    engines: {
        nunjunks: nunjunks_1.NunjunksEngine
    },
    onError: {
        path: undefined,
        tplStr: undefined,
        content: (_) => "Internal Server Error"
    },
    onDevError: {
        path: undefined,
        tplStr: undefined,
        content: (e, title) => `
      <h3 style="color: #ff3355;font-size: 32px;font-family: monospace;">${(checkCustomError(e) && `${title || "Render Error"} -- ${e.name}`) || (title || "Render Error")}</h3>
      <pre style="font-size: 13px;color: #606060;background: #f6f6f6;padding: 12px;overflow-x: auto;">${e.stack}</pre>
    `
    }
};
function checkCustomError(error) {
    return error && error.name && error.name !== "Error";
}
/** RenderResult配置token */
exports.RENDER_RESULT_OPTIONS = Configs_1.createOptions("RENDER_RESULT_OPTIONS");
//# sourceMappingURL=render.options.js.map