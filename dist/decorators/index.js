"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./injectable"), exports);
tslib_1.__exportStar(require("./controller"), exports);
var route_1 = require("./route");
exports.GET = route_1.GET;
exports.POST = route_1.POST;
exports.PUT = route_1.PUT;
exports.DELETE = route_1.DELETE;
exports.FromParams = route_1.FromParams;
exports.FromBody = route_1.FromBody;
//# sourceMappingURL=index.js.map