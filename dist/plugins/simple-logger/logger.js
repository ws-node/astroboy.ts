"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const injectable_1 = require("../../decorators/injectable");
const Configs_1 = require("../../services/Configs");
const options_1 = require("./options");
const base_1 = require("./base");
function createStamp(date) {
    const tData = date || new Date();
    return `[${chalk_1.default.cyan(`${tData.toLocaleDateString()} ${tData.toLocaleTimeString()}:${tData.getMilliseconds()}`)}]-`;
}
function createType(type) {
    let color;
    let tps;
    switch (type) {
        case base_1.SimpleLogLevel.FATAL:
        case base_1.SimpleLogLevel.ERROR:
            [color, tps] = ["red", "ERROR"];
            break;
        case base_1.SimpleLogLevel.WARN:
            [color, tps] = ["yellow", "WARN"];
            break;
        case base_1.SimpleLogLevel.INFO:
            [color, tps] = ["blue", "INFO"];
            break;
        case base_1.SimpleLogLevel.DEBUG:
            [color, tps] = ["green", "DEBUG"];
            break;
        default: [color, tps] = ["white", "TRACE"];
    }
    return `[${chalk_1.default[color](tps)}]-`;
}
let SimpleLogger = class SimpleLogger {
    constructor(configs) {
        this.configs = configs;
        this.pkgEnv = this.configs.get(options_1.SIMPLE_LOGGER_OPTIONS);
    }
    log(level, ...args) {
        if (level < this.pkgEnv.level)
            return;
        const [title, details] = args;
        console.log(`${createStamp()}${createType(level)}${title}`);
        if (details) {
            console.log(details);
        }
    }
    trace(...msg) {
        return this.log(base_1.SimpleLogLevel.TRACE, ...msg);
    }
    debug(...msg) {
        return this.log(base_1.SimpleLogLevel.DEBUG, ...msg);
    }
};
SimpleLogger = tslib_1.__decorate([
    injectable_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [Configs_1.Configs])
], SimpleLogger);
exports.SimpleLogger = SimpleLogger;
//# sourceMappingURL=logger.js.map