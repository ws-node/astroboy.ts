"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const Configs_1 = require("../../services/Configs");
exports.defaultNunjunksOptions = {
    root: path_1.default.resolve(__dirname, "app/views"),
    cache: true,
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
};
exports.NUNJUNKS_OPTIONS = Configs_1.createOptions("NUNJUNKS_OPTIONS");
//# sourceMappingURL=options.js.map