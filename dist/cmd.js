"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./src/cmd/base");
exports.create = base_1.createCmdConfig;
exports.merge = base_1.mergeCmdConfig;
var CMD;
(function (CMD) {
    function create(config) {
        return base_1.createCmdConfig(config);
    }
    CMD.create = create;
    function merge(merge, config) {
        return base_1.mergeCmdConfig(merge, config);
    }
    CMD.merge = merge;
})(CMD || (CMD = {}));
exports.default = CMD;
//# sourceMappingURL=cmd.js.map