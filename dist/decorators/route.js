"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_factory_1 = require("astroboy-router/dist/decorators/route.factory");
const utils_1 = require("astroboy-router/dist/decorators/utils");
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
function FromParams() {
    return function route_query(prototype, propKey, index) {
        tryGetRouteMagic(prototype, propKey).params.push({
            type: "params",
            index
        });
    };
}
exports.FromParams = FromParams;
function FromBody() {
    return function route_query(prototype, propKey, index) {
        tryGetRouteMagic(prototype, propKey).params.push({
            type: "body",
            index
        });
    };
}
exports.FromBody = FromBody;
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