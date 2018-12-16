"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const injectable_1 = require("../../decorators/injectable");
const Configs_1 = require("../../services/Configs");
const env_config_1 = require("../../configs/env.config");
var SimpleLogLevel;
(function (SimpleLogLevel) {
    SimpleLogLevel[SimpleLogLevel["TRACE"] = 0] = "TRACE";
    SimpleLogLevel[SimpleLogLevel["DEBUG"] = 1] = "DEBUG";
    SimpleLogLevel[SimpleLogLevel["INFO"] = 2] = "INFO";
    SimpleLogLevel[SimpleLogLevel["WARN"] = 3] = "WARN";
    SimpleLogLevel[SimpleLogLevel["ERROR"] = 4] = "ERROR";
    SimpleLogLevel[SimpleLogLevel["FATAL"] = 5] = "FATAL";
})(SimpleLogLevel = exports.SimpleLogLevel || (exports.SimpleLogLevel = {}));
function createStamp(date) {
    const tData = date || new Date();
    return `[${chalk_1.default.cyan(`${tData.toLocaleDateString()} ${tData.toLocaleTimeString()}:${tData.getMilliseconds()}`)}]-`;
}
function createType(type) {
    let color;
    let tps;
    switch (type) {
        case SimpleLogLevel.FATAL:
        case SimpleLogLevel.ERROR:
            [color, tps] = ["red", "ERROR"];
            break;
        case SimpleLogLevel.WARN:
            [color, tps] = ["yellow", "WARN"];
            break;
        case SimpleLogLevel.INFO:
            [color, tps] = ["blue", "INFO"];
            break;
        case SimpleLogLevel.DEBUG:
            [color, tps] = ["green", "DEBUG"];
            break;
        default: [color, tps] = ["white", "TRACE"];
    }
    return `[${chalk_1.default[color](tps)}]-`;
}
let SimpleLogger = class SimpleLogger {
    constructor(configs) {
        this.configs = configs;
        this.env = configs.get(env_config_1.ENV).env;
    }
    log(level, ...args) {
        const [title, details] = args;
        console.log(`${createStamp()}${createType(level)}${title}`);
        if (details) {
            console.log(details);
        }
    }
    trace(...msg) {
        if (this.env === "production")
            return;
        return this.log(SimpleLogLevel.TRACE, ...msg);
    }
    debug(...msg) {
        return this.log(SimpleLogLevel.DEBUG, ...msg);
    }
};
SimpleLogger = tslib_1.__decorate([
    injectable_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [Configs_1.Configs])
], SimpleLogger);
exports.SimpleLogger = SimpleLogger;
//# sourceMappingURL=index.js.map