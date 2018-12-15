"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const injectable_1 = require("../../decorators/injectable");
const Render_1 = require("../../services/Render");
const Configs_1 = require("../../services/Configs");
const options_1 = require("./options");
const nunjucks_1 = require("nunjucks");
let NunjunksEngine = class NunjunksEngine {
    constructor(cfg, rs) {
        this.cfg = cfg;
        this.rs = rs;
    }
    get configs() {
        return this["@configs"] || (this["@configs"] = this.cfg.get(options_1.NUNJUNKS_OPTIONS));
    }
    get loader() {
        return this["@loader"] || (this["@loader"] = new nunjucks_1.FileSystemLoader(this.configs.root, { noCache: !this.configs.cache }));
    }
    createEnv(configs) {
        return new nunjucks_1.Environment(this.loader, !configs ? this.configs : Object.assign({}, this.configs, configs));
    }
    render(name, configs) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.createEnv(configs).render(name, this.rs.views);
        });
    }
    renderString(tpl, configs) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.createEnv(configs).renderString(tpl, this.rs.views);
        });
    }
};
NunjunksEngine = tslib_1.__decorate([
    injectable_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [Configs_1.Configs, Render_1.Render])
], NunjunksEngine);
exports.NunjunksEngine = NunjunksEngine;
//# sourceMappingURL=core.js.map