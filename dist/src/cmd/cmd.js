"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
function create(config) {
    return base_1.createCmdConfig(config);
}
exports.create = create;
function merge(merge, config) {
    return base_1.mergeCmdConfig(merge, config);
}
exports.merge = merge;
// }
//# sourceMappingURL=cmd.js.map