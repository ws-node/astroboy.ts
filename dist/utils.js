"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const get_1 = tslib_1.__importDefault(require("lodash/get"));
const v4_1 = tslib_1.__importDefault(require("uuid/v4"));
const di_1 = require("@bonbons/di");
const Injector_1 = require("./services/Injector");
exports.Colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m\x1b[1m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
    white: "\x1b[37m"
};
function setColor(name, value) {
    return `${exports.Colors[name]}${value}${exports.Colors.reset}`;
}
exports.setColor = setColor;
exports.GlobalDI = new di_1.DIContainer();
exports.GlobalImplements = new Map();
function setScopeId(ctx) {
    const state = ctx.state || (ctx.state = {});
    return state["$$scopeId"] = v4_1.default();
}
exports.setScopeId = setScopeId;
function getScopeId(ctx, short) {
    if (!short)
        return get_1.default(ctx, "state['$$scopeId']");
    return getShortScopeId(getScopeId(ctx, false));
}
exports.getScopeId = getScopeId;
function getShortScopeId(scopeId) {
    return (scopeId || "").toString().split("-")[0];
}
exports.getShortScopeId = getShortScopeId;
function getInjector(ctx) {
    return exports.GlobalDI.get(Injector_1.InjectService, getScopeId(ctx));
}
exports.getInjector = getInjector;
function resolveDepts(target, ctx) {
    return exports.GlobalDI.getDepedencies(di_1.getDependencies(target) || [], getScopeId(ctx));
}
exports.resolveDepts = resolveDepts;
function createInstance(target, ctx) {
    return new target(...resolveDepts(target, ctx));
}
exports.createInstance = createInstance;
function optionAssign(configs, token, newValue) {
    return isCustomClassInstance(newValue || {}) ?
        newValue :
        Object.assign(configs.get(token) || {}, newValue);
}
exports.optionAssign = optionAssign;
function isCustomClassInstance(obj, type) {
    return !type ?
        (getPrototypeConstructor(obj) !== Object) :
        (getPrototypeConstructor(obj) === type);
}
exports.isCustomClassInstance = isCustomClassInstance;
function getPrototypeConstructor(obj) {
    const proto = Object.getPrototypeOf(obj);
    return proto && proto.constructor;
}
exports.getPrototypeConstructor = getPrototypeConstructor;
function getMethodParamsType(prototype, propertyKey) {
    return Reflect.getMetadata(di_1.PARAMS_META_KEY, prototype, propertyKey) || [];
}
exports.getMethodParamsType = getMethodParamsType;
function getPropertyType(prototype, propertyKey) {
    return Reflect.getMetadata(di_1.TYPE_META_KEY, prototype, propertyKey) || undefined;
}
exports.getPropertyType = getPropertyType;
//# sourceMappingURL=utils.js.map