"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configs_1 = require("../../services/Configs");
const base_1 = require("./base");
exports.defaultSimpleLoggerOptions = {
    level: base_1.SimpleLogLevel.WARN
};
exports.SIMPLE_LOGGER_OPTIONS = Configs_1.createOptions("SIMPLE_LOGGER_OPTIONS");
//# sourceMappingURL=options.js.map