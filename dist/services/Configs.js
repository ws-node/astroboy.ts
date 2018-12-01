"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = (key) => ({ key: Symbol(`ASTROBOY-TS-TOKEN:${key}`) });
class ConfigCollection {
    constructor() {
        this.map = new Map();
    }
    set(token, entry) {
        this.map.set(token.key, { value: entry });
    }
    get(token) {
        const entry = this.map.get(token.key);
        return entry && entry.value;
    }
    toArray() {
        return Array.from(this.map.entries()).map(([sb, { value }]) => ({ token: { key: sb }, value }));
    }
}
exports.ConfigCollection = ConfigCollection;
/**
 * ## 全局配置容器
 * @description
 * @author Big Mogician
 * @export
 * @abstract
 * @class Configs
 * @implements {ReadonlyConfigs}
 */
class Configs {
}
exports.Configs = Configs;
//# sourceMappingURL=Configs.js.map