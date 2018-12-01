"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const injectable_1 = require("../decorators/injectable");
const Context_1 = require("./Context");
/**
 * ## Astroboy.ts基础上下文服务
 * * `ctx` 承载Koa.Context
 * * `app` 承载Koa.Application
 * * `config` 承载业务config
 * @description
 * @author Big Mogician
 * @export
 * @class AstroboyContext
 * @template T
 */
let AstroboyContext = class AstroboyContext {
    constructor(context) {
        this.context = context;
    }
    /** BaseClass.ctx */
    get ctx() { return this.context.ctx; }
    /** BaseClass.app */
    get app() { return this.ctx.app; }
    /** BaseClass.config */
    get config() { return this.app["config"] || {}; }
    getConfig(...args) {
        return this.ctx.getConfig(...args);
    }
    getServiceClass(...args) {
        return this.ctx.getServiceClass(...args);
    }
    getService(...args) {
        return this.ctx.getService(...args);
    }
    callService(...args) {
        // @ts-ignore
        return this.ctx.callService(...args);
    }
    invokeServiceMethod(...args) {
        // @ts-ignore
        return this.ctx.invokeServiceMethod(...args);
    }
    getLib(...args) {
        return this.ctx.getLib(...args);
    }
};
AstroboyContext = __decorate([
    injectable_1.Injectable(),
    __metadata("design:paramtypes", [Context_1.Context])
], AstroboyContext);
exports.AstroboyContext = AstroboyContext;
//# sourceMappingURL=AstroboyContext.js.map