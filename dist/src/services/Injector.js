"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ## 依赖注入服务
 * * 手动注入器
 * @description
 * @author Big Mogician
 * @export
 * @abstract
 * @class InjectService
 */
class InjectService {
}
exports.InjectService = InjectService;
function createInjectMixin(...args) {
    const [target, ...others] = args;
    if (others[0] instanceof Array) {
        return createProxyByKeys(target, others[0]);
    }
    else {
        return createProxyByDepts(target, others);
    }
}
exports.createInjectMixin = createInjectMixin;
function createProxyByDepts(target, depts) {
    return new Proxy(target, {
        get(target, key) {
            if (target[key])
                return target[key];
            for (let index = 0; index < depts.length; index++) {
                const current = depts[index];
                if (current[key])
                    return current[key];
            }
            return undefined;
        },
        set(target, key, value) {
            if (target[key])
                return target[key] = value;
            for (let index = 0; index < depts.length; index++) {
                const current = depts[index];
                if (current[key])
                    return current[key] = value;
            }
        },
        deleteProperty(target, key) {
            throw new Error("Action [deleteProperty] of DI-Mixin is invalid.");
        },
        enumerate(target) {
            const ms = Object.assign({}, target, ...depts);
            return Object.keys(ms);
        },
        ownKeys(target) {
            const ms = Object.assign({}, target, ...depts);
            return Object.keys(ms);
        },
        has(target, key) {
            let has = key in target;
            if (has)
                return true;
            for (let index = 0; index < depts.length; index++) {
                has = depts[index] in depts[index];
                if (has)
                    return true;
            }
            return false;
        },
        defineProperty(target, key, descriptor) {
            throw new Error("Action [defineProperty] of DI-Mixin is invalid.");
        }
    });
}
function createProxyByKeys(target, depts) {
    return new Proxy(target, {
        get(target, key) {
            if (target[key])
                return target[key];
            for (let index = 0; index < depts.length; index++) {
                const current = target[depts[index]];
                if (current[key])
                    return current[key];
            }
            return undefined;
        },
        set(target, key, value) {
            if (target[key])
                return target[key] = value;
            for (let index = 0; index < depts.length; index++) {
                const current = target[depts[index]];
                if (current[key])
                    return current[key] = value;
            }
        },
        deleteProperty(target, key) {
            throw new Error("Action [deleteProperty] of DI-Mixin is invalid.");
        },
        enumerate(target) {
            const ms = Object.assign({}, target, ...depts.map(i => target[i]));
            return Object.keys(ms);
        },
        ownKeys(target) {
            const ms = Object.assign({}, target, ...depts.map(i => target[i]));
            return Object.keys(ms);
        },
        has(target, key) {
            let has = key in target;
            if (has)
                return true;
            for (let index = 0; index < depts.length; index++) {
                has = depts[index] in target[depts[index]];
                if (has)
                    return true;
            }
            return false;
        },
        defineProperty(target, key, descriptor) {
            throw new Error("Action [defineProperty] of DI-Mixin is invalid.");
        }
    });
}
//# sourceMappingURL=Injector.js.map