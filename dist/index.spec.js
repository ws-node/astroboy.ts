"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Pkg = tslib_1.__importStar(require("./index"));
const chai_1 = require("chai");
require("mocha");
describe("astroboy.ts/src/index.ts", () => {
    it("test astroboy.ts package exports", () => {
        chai_1.expect(Object.keys(Pkg).length, "[astroboy.ts] exports count").to.equal(58);
        chai_1.expect(typeof Pkg.API, "[astroboy.ts].API").to.equal("function");
        chai_1.expect(typeof Pkg.Astroboy, "[astroboy.ts].Astroboy").to.equal("function");
        chai_1.expect(typeof Pkg.AstroboyContext, "[astroboy.ts].AstroboyContext").to.equal("function");
        chai_1.expect(typeof Pkg.Auth, "[astroboy.ts].Auth").to.equal("function");
        chai_1.expect(typeof Pkg.BaseClass, "[astroboy.ts].BaseClass").to.equal("function");
        chai_1.expect(typeof Pkg.Authorize, "[astroboy.ts].Authorize").to.equal("function");
        chai_1.expect(typeof Pkg.CONFIG_VIEW, "[astroboy.ts].CONFIG_VIEW").to.equal("object");
        chai_1.expect(typeof Pkg.Configs, "[astroboy.ts].Configs").to.equal("function");
        chai_1.expect(typeof Pkg.Context, "[astroboy.ts].Context").to.equal("function");
        chai_1.expect(typeof Pkg.Controller, "[astroboy.ts].Controller").to.equal("function");
        chai_1.expect(typeof Pkg.CustomRoute, "[astroboy.ts].CustomRoute").to.equal("function");
        chai_1.expect(typeof Pkg.DELETE, "[astroboy.ts].DELETE").to.equal("function");
        chai_1.expect(typeof Pkg.Deserialize, "[astroboy.ts].Deserialize").to.equal("function");
        chai_1.expect(typeof Pkg.ENV, "[astroboy.ts].ENV").to.equal("object");
        chai_1.expect(typeof Pkg.Extends, "[astroboy.ts].Extends").to.equal("function");
        chai_1.expect(typeof Pkg.FromBody, "[astroboy.ts].FromBody").to.equal("function");
        chai_1.expect(typeof Pkg.FromParams, "[astroboy.ts].FromParams").to.equal("function");
        chai_1.expect(typeof Pkg.GET, "[astroboy.ts].GET").to.equal("function");
        chai_1.expect(typeof Pkg.Index, "[astroboy.ts].Index").to.equal("function");
        chai_1.expect(typeof Pkg.Inject, "[astroboy.ts].Inject").to.equal("function");
        chai_1.expect(typeof Pkg.InjectScope, "[astroboy.ts].InjectScope").to.equal("object");
        chai_1.expect(typeof Pkg.InjectService, "[astroboy.ts].InjectService").to.equal("function");
        chai_1.expect(typeof Pkg.Injectable, "[astroboy.ts].Injectable").to.equal("function");
        chai_1.expect(typeof Pkg.JSON_RESULT_OPTIONS, "[astroboy.ts].JSON_RESULT_OPTIONS").to.equal("object");
        chai_1.expect(typeof Pkg.JsonResolvers, "[astroboy.ts].JsonResolvers").to.equal("object");
        chai_1.expect(typeof Pkg.JsonResult, "[astroboy.ts].JsonResult").to.equal("function");
        chai_1.expect(typeof Pkg.Metadata, "[astroboy.ts].Metadata").to.equal("function");
        chai_1.expect(typeof Pkg.NUNJUNKS_OPTIONS, "[astroboy.ts].NUNJUNKS_OPTIONS").to.equal("object");
        chai_1.expect(typeof Pkg.NoAuthorize, "[astroboy.ts].NoAuthorize").to.equal("function");
        chai_1.expect(typeof Pkg.POST, "[astroboy.ts].POST").to.equal("function");
        chai_1.expect(typeof Pkg.PUT, "[astroboy.ts].PUT").to.equal("function");
        chai_1.expect(typeof Pkg.RENDER_RESULT_OPTIONS, "[astroboy.ts].RENDER_RESULT_OPTIONS").to.equal("object");
        chai_1.expect(typeof Pkg.ROUTER_OPTIONS, "[astroboy.ts].ROUTER_OPTIONS").to.equal("object");
        chai_1.expect(typeof Pkg.Render, "[astroboy.ts].Render").to.equal("function");
        chai_1.expect(typeof Pkg.RenderResult, "[astroboy.ts].RenderResult").to.equal("function");
        chai_1.expect(typeof Pkg.Router, "[astroboy.ts].Router").to.equal("function");
        chai_1.expect(typeof Pkg.STATIC_RESOLVER, "[astroboy.ts].STATIC_RESOLVER").to.equal("object");
        chai_1.expect(typeof Pkg.Serialize, "[astroboy.ts].Serialize").to.equal("function");
        chai_1.expect(typeof Pkg.Server, "[astroboy.ts].Server").to.equal("function");
        chai_1.expect(typeof Pkg.Service, "[astroboy.ts].Service").to.equal("function");
        chai_1.expect(typeof Pkg.TypedSerializer, "[astroboy.ts].TypedSerializer").to.equal("object");
        chai_1.expect(typeof Pkg.__BASE_ROUTE_DECO_FACTORY, "[astroboy.ts].__BASE_ROUTE_DECO_FACTORY").to.equal("function");
        chai_1.expect(typeof Pkg.buildRouter, "[astroboy.ts].buildRouter").to.equal("function");
        chai_1.expect(typeof Pkg.createConfig, "[astroboy.ts].createConfig").to.equal("function");
        chai_1.expect(typeof Pkg.createInjectMixin, "[astroboy.ts].createInjectMixin").to.equal("function");
        chai_1.expect(typeof Pkg.createOptions, "[astroboy.ts].createOptions").to.equal("function");
        chai_1.expect(typeof Pkg.createRouter, "[astroboy.ts].createRouter").to.equal("function");
        chai_1.expect(typeof Pkg.defaultEnv, "[astroboy.ts].defaultEnv").to.equal("object");
        chai_1.expect(typeof Pkg.defaultJsonResultOptions, "[astroboy.ts].defaultJsonResultOptions").to.equal("object");
        chai_1.expect(typeof Pkg.defaultRenderResultOptions, "[astroboy.ts].defaultRenderResultOptions").to.equal("object");
        chai_1.expect(typeof Pkg.defaultRouterOptions, "[astroboy.ts].defaultRouterOptions").to.equal("object");
        chai_1.expect(typeof Pkg.defaultView, "[astroboy.ts].defaultView").to.equal("object");
        chai_1.expect(typeof Pkg.injectScope, "[astroboy.ts].injectScope").to.equal("function");
        chai_1.expect(typeof Pkg.preInitFn, "[astroboy.ts].preInitFn").to.equal("function");
        chai_1.expect(typeof Pkg.serverInit, "[astroboy.ts].serverInit").to.equal("function");
        // 20181223
        chai_1.expect(typeof Pkg.SIMPLE_LOGGER_OPTIONS, "[astroboy.ts].SIMPLE_LOGGER_OPTIONS").to.equal("object");
        // 20181227
        chai_1.expect(typeof Pkg.GLOBAL_ERROR, "[astroboy.ts].GLOBAL_ERROR").to.equal("object");
        chai_1.expect(typeof Pkg.defaultGlobalError, "[astroboy.ts].defaultGlobalError").to.equal("object");
    });
});
//# sourceMappingURL=index.spec.js.map