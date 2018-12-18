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
        content: (e) => `<h3 style="color: red">${(e.name && `模板渲染错误: ${e.name}`) || "模板渲染错误"}<h3><pre>${e.stack}</pre>`
    }
};
/** RenderResult配置token */
exports.RENDER_RESULT_OPTIONS = Configs_1.createOptions("RENDER_RESULT_OPTIONS");
//# sourceMappingURL=render.options.js.map