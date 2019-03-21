import * as Pkg from "../src/index";
import { expect } from "chai";
import { defineUnit } from "./unit";

defineUnit(["index", "Astroboy.ts index outputs"], () => {
  it("test astroboy.ts package exports", () => {
    expect(Object.keys(Pkg).length, "[astroboy.ts] exports count").to.equal(60);
    expect(typeof Pkg.API, "[astroboy.ts].API").to.equal("function");
    expect(typeof Pkg.Astroboy, "[astroboy.ts].Astroboy").to.equal("function");
    expect(
      typeof Pkg.AstroboyContext,
      "[astroboy.ts].AstroboyContext"
    ).to.equal("function");
    expect(typeof Pkg.Auth, "[astroboy.ts].Auth").to.equal("function");
    expect(typeof Pkg.BaseClass, "[astroboy.ts].BaseClass").to.equal(
      "function"
    );
    expect(typeof Pkg.Authorize, "[astroboy.ts].Authorize").to.equal(
      "function"
    );
    expect(typeof Pkg.CONFIG_VIEW, "[astroboy.ts].CONFIG_VIEW").to.equal(
      "object"
    );
    expect(typeof Pkg.Configs, "[astroboy.ts].Configs").to.equal("function");
    expect(typeof Pkg.Context, "[astroboy.ts].Context").to.equal("function");
    expect(typeof Pkg.Controller, "[astroboy.ts].Controller").to.equal(
      "function"
    );
    expect(typeof Pkg.CustomRoute, "[astroboy.ts].CustomRoute").to.equal(
      "function"
    );
    expect(typeof Pkg.DELETE, "[astroboy.ts].DELETE").to.equal("function");
    expect(typeof Pkg.Deserialize, "[astroboy.ts].Deserialize").to.equal(
      "function"
    );
    expect(typeof Pkg.ENV, "[astroboy.ts].ENV").to.equal("object");
    expect(typeof Pkg.Extends, "[astroboy.ts].Extends").to.equal("function");
    expect(typeof Pkg.FromBody, "[astroboy.ts].FromBody").to.equal("function");
    expect(typeof Pkg.FromParams, "[astroboy.ts].FromParams").to.equal(
      "function"
    );
    expect(typeof Pkg.GET, "[astroboy.ts].GET").to.equal("function");
    expect(typeof Pkg.Index, "[astroboy.ts].Index").to.equal("function");
    expect(typeof Pkg.Inject, "[astroboy.ts].Inject").to.equal("function");
    expect(typeof Pkg.InjectScope, "[astroboy.ts].InjectScope").to.equal(
      "object"
    );
    expect(typeof Pkg.InjectService, "[astroboy.ts].InjectService").to.equal(
      "function"
    );
    expect(typeof Pkg.Injectable, "[astroboy.ts].Injectable").to.equal(
      "function"
    );
    expect(
      typeof Pkg.JSON_RESULT_OPTIONS,
      "[astroboy.ts].JSON_RESULT_OPTIONS"
    ).to.equal("object");
    expect(typeof Pkg.JsonResolvers, "[astroboy.ts].JsonResolvers").to.equal(
      "object"
    );
    expect(typeof Pkg.JsonResult, "[astroboy.ts].JsonResult").to.equal(
      "function"
    );
    expect(typeof Pkg.Metadata, "[astroboy.ts].Metadata").to.equal("function");
    expect(
      typeof Pkg.NUNJUNKS_OPTIONS,
      "[astroboy.ts].NUNJUNKS_OPTIONS"
    ).to.equal("object");
    expect(typeof Pkg.NoAuthorize, "[astroboy.ts].NoAuthorize").to.equal(
      "function"
    );
    expect(typeof Pkg.POST, "[astroboy.ts].POST").to.equal("function");
    expect(typeof Pkg.PUT, "[astroboy.ts].PUT").to.equal("function");
    expect(
      typeof Pkg.RENDER_RESULT_OPTIONS,
      "[astroboy.ts].RENDER_RESULT_OPTIONS"
    ).to.equal("object");
    expect(typeof Pkg.ROUTER_OPTIONS, "[astroboy.ts].ROUTER_OPTIONS").to.equal(
      "object"
    );
    expect(typeof Pkg.Render, "[astroboy.ts].Render").to.equal("function");
    expect(typeof Pkg.RenderResult, "[astroboy.ts].RenderResult").to.equal(
      "function"
    );
    expect(typeof Pkg.Router, "[astroboy.ts].Router").to.equal("function");
    expect(
      typeof Pkg.STATIC_RESOLVER,
      "[astroboy.ts].STATIC_RESOLVER"
    ).to.equal("object");
    expect(typeof Pkg.Serialize, "[astroboy.ts].Serialize").to.equal(
      "function"
    );
    expect(typeof Pkg.Server, "[astroboy.ts].Server").to.equal("function");
    expect(typeof Pkg.Service, "[astroboy.ts].Service").to.equal("function");
    expect(
      typeof Pkg.TypedSerializer,
      "[astroboy.ts].TypedSerializer"
    ).to.equal("object");
    expect(
      typeof Pkg.__BASE_ROUTE_DECO_FACTORY,
      "[astroboy.ts].__BASE_ROUTE_DECO_FACTORY"
    ).to.equal("function");
    expect(typeof Pkg.buildRouter, "[astroboy.ts].buildRouter").to.equal(
      "function"
    );
    expect(typeof Pkg.createConfig, "[astroboy.ts].createConfig").to.equal(
      "function"
    );
    expect(
      typeof Pkg.createInjectMixin,
      "[astroboy.ts].createInjectMixin"
    ).to.equal("function");
    expect(typeof Pkg.createOptions, "[astroboy.ts].createOptions").to.equal(
      "function"
    );
    expect(typeof Pkg.createRouter, "[astroboy.ts].createRouter").to.equal(
      "function"
    );
    expect(typeof Pkg.defaultEnv, "[astroboy.ts].defaultEnv").to.equal(
      "object"
    );
    expect(typeof Pkg.defaultView, "[astroboy.ts].defaultView").to.equal(
      "object"
    );
    expect(typeof Pkg.injectScope, "[astroboy.ts].injectScope").to.equal(
      "function"
    );
    expect(typeof Pkg.preInitFn, "[astroboy.ts].preInitFn").to.equal(
      "function"
    );
    expect(typeof Pkg.serverInit, "[astroboy.ts].serverInit").to.equal(
      "function"
    );
    // 20181223
    expect(
      typeof Pkg.SIMPLE_LOGGER_OPTIONS,
      "[astroboy.ts].SIMPLE_LOGGER_OPTIONS"
    ).to.equal("object");
    // 20181227
    expect(typeof Pkg.GLOBAL_ERROR, "[astroboy.ts].GLOBAL_ERROR").to.equal(
      "object"
    );
    // 20190222
    expect(typeof Pkg.Bundles, "[astroboy.ts].Bundles").to.equal("object");
    // 20190306
    expect(
      typeof Pkg.ReactiveSingleton,
      "[astroboy.ts].ReactiveSingleton"
    ).to.equal("function");
    expect(typeof Pkg.Watch, "[astroboy.ts].Watch").to.equal("function");
    // 20190320
    expect(
      typeof Pkg.preConfigCompiler,
      "[astroboy.ts].preConfigCompiler"
    ).to.equal("function");
    expect(
      typeof Pkg.CONFIG_COMPILER_OPTIONS,
      "[astroboy.ts].CONFIG_COMPILER_OPTIONS"
    ).to.equal("object");
    expect(typeof Pkg.ConfigReader, "[astroboy.ts].ConfigReader").to.equal(
      "function"
    );
  });
});
