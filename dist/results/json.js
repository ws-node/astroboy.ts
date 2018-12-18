"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const camelcase_1 = tslib_1.__importDefault(require("camelcase"));
const decamelize_1 = tslib_1.__importDefault(require("decamelize"));
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const options_1 = require("../options");
const utils_1 = require("../utils");
/**
 * ## Body序列化约定实现
 * * 按照约定将内容序列化到body响应中
 * @description
 * @author Big Mogician
 * @export
 * @class JsonResult
 * @implements {IResult}
 */
class JsonResult {
    constructor(value, configs) {
        this.value = value;
        this.configs = configs;
    }
    /**
     * ### 将json对象序列化写入body
     * * @框架调用方法，请勿手动调用
     * @description
     * @author Big Mogician
     * @param {IResultScope} { configs }
     * @returns {string}
     * @memberof JsonResult
     */
    toResult({ configs }) {
        const { format, whiteSpace: b, keyResolver: r, jsonTemplate: tpl, jsonTplKey: tplKey } = Object.assign({}, configs.get(options_1.JSON_RESULT_OPTIONS), this.configs);
        let value = this.value || {};
        if (tpl) {
            const n = Object.assign({}, tpl);
            if (tplKey)
                set_1.default(n, tplKey, value);
            value = n;
        }
        return JSON.stringify(!r ? value : utils_1.resolveKeys(r, value), null, decideWhiteSpace(format, b));
    }
}
exports.JsonResult = JsonResult;
function decideWhiteSpace(format, b) {
    if (!format)
        return "";
    switch (b) {
        case 4: return "    ";
        case 2: return "  ";
        case 1: return " ";
        case 0: return "";
        default: return "";
    }
}
function camelCase(key) {
    return camelcase_1.default(key);
}
function snakeCase(key) {
    return decamelize_1.default(key, "_");
}
exports.JsonResolvers = {
    camelcase: camelCase,
    snakecase: snakeCase
};
//# sourceMappingURL=json.js.map