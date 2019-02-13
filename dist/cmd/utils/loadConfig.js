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
        // only check if throwing is an error.
        if (error.message && typeof error.message === "string") {
            // import errors occures.
            if (error.message.startsWith("Cannot find module")) {
                // use custom atc.config file.
                if (fileName === defaultName) {
                    // maybe syntax error, throws.
                    throw error;
                }
                else {
                    // maybe filename error, throws.
                    throw new Error(`未找到atc配置文件：[${_name}]`);
                }
            }
            else {
                // throws anyway.
                throw error;
            }
        }
        console.log(chalk_1.default.yellow("未配置atc配置文件, 使用默认配置"));
        config = {};
    }
    return config;
}
exports.loadConfig = loadConfig;
//# sourceMappingURL=loadConfig.js.map