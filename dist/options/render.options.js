"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configs_1 = require("../services/Configs");
const core_1 = require("../plugins/nunjunks/core");
exports.defaultRenderResultOptions = {
    astConf: {
        use: false,
        configs: undefined
    },
    path: "",
    tplStr: undefined,
    state: undefined,
    configs: undefined,
    engine: "nunjunks",
    engines: {
        nunjunks: core_1.NunjunksEngine
    }
};
exports.RENDER_RESULT_OPTIONS = Configs_1.createOptions("RENDER_RESULT_OPTIONS");
//# sourceMappingURL=render.options.js.map