"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_factory_1 = require("astroboy-router/dist/decorators/route.factory");
const utils_1 = require("astroboy-router/dist/decorators/utils");
const utils_2 = require("../utils");
const MAGIC_CONTENT = new Map();
function tryGetRouteMagic(prototype, key) {
    const router = tryGetRouterMagic(prototype);
    let route = router.routes[key];
    if (!route) {
        router.routes[key] = route = {
            params: []
        };
    }
    return route;
}
exports.tryGetRouteMagic = tryGetRouteMagic;
function tryGetRouterMagic(prototype) {
    let found = MAGIC_CONTENT.get(prototype);
    if (!found) {
        MAGIC_CONTENT.set(prototype, found = {
            prototype,
            routes: {},
            routerMeta: utils_1.tryGetRouter(prototype)
        });
    }
    return found;
}
exports.tryGetRouterMagic = tryGetRouterMagic;
function FromParams(options) {
    const { transform = undefined, useStatic = undefined } = options || {};
    return function dynamic_params(prototype, propKey, index) {
        route_query({ prototype, propKey, index, transform, useStatic, type: "params" });
    };
}
exports.FromParams = FromParams;
function FromBody(options) {
    const { transform = undefined, useStatic = undefined } = options || {};
    return function dynamic_params(prototype, propKey, index) {
        route_query({ prototype, propKey, index, transform, useStatic, type: "body" });
    };
}
exports.FromBody = FromBody;
function route_query({ type, prototype, propKey, index, transform, useStatic }) {
    const types = utils_2.getMethodParamsType(prototype, propKey);
    tryGetRouteMagic(prototype, propKey).params.push({
        ctor: resolveParamType(types[index]),
        resolver: transform,
        static: useStatic,
        type,
        index
    });
}
function resolveParamType(type) {
    if (!type)
        return undefined;
    if (type === Object)
        return undefined;
    return type;
}
function addMagicForRoute(method, path) {
    return function route_magic(prototype, propKey, descriptor) {
        route_factory_1.APIFactory(method, path)(prototype, propKey, descriptor);
    };
}
function GET(path) {
    return addMagicForRoute("GET", path);
}
exports.GET = GET;
function PUT(path) {
    return addMagicForRoute("PUT", path);
}
exports.PUT = PUT;
function POST(path) {
    return addMagicForRoute("POST", path);
}
exports.POST = POST;
function DELETE(path) {
    return addMagicForRoute("DELETE", path);
}
exports.DELETE = DELETE;
//# sourceMappingURL=route.js.map