"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const path_1 = tslib_1.__importDefault(require("path"));
function loadConfig(root, fileName, defaultName = "atc.config.js") {
    const _name = path_1.default.join(root, fileName || defaultName);
    let config;
    try {
        config = require(_name) || {};
    }
    catch (error) {
        console.log(error);
        console.log(chalk_1.default.yellow("未配置atc配置文件或者解析文件异常, 使用默认配置"));
        config = {};
    }
    return config;
}
exports.loadConfig = loadConfig;
//# sourceMappingURL=loadConfig.js.map