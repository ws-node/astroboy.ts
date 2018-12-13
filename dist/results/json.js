"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const camelcase_1 = tslib_1.__importDefault(require("camelcase"));
const decamelize_1 = tslib_1.__importDefault(require("decamelize"));
const reduce_1 = tslib_1.__importDefault(require("lodash/reduce"));
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const isPlainObject_1 = tslib_1.__importDefault(require("lodash/isPlainObject"));
const json_options_1 = require("../configs/json.options");
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
        const { format, whiteSpace: b, keyResolver: r, jsonTemplate: tpl, jsonTplKey: tplKey } = Object.assign({}, configs.get(json_options_1.JSON_RESULT_OPTIONS), this.configs);
        let value = this.value || {};
        if (tpl) {
            const n = Object.assign({}, tpl);
            if (tplKey)
                set_1.default(n, tplKey, value);
            value = n;
        }
        return JSON.stringify(!r ? value : resolveKeys(r, value), null, decideWhiteSpace(format, b));
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
function resolveKeys(resolver, value, deep = true) {
    let res;
    if (Array.isArray(value) && value.length > 0) {
        res = [];
    }
    else if (isPlainObject_1.default(value) && Object.keys(value).length > 0) {
        res = {};
    }
    else {
        return value;
    }
    return reduce_1.default(value, (result, val, key) => {
        if (deep) {
            val = resolveKeys(resolver, val);
        }
        const newKey = typeof key === "string" ? resolver(key) : key;
        result[newKey] = val;
        return result;
    }, res);
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