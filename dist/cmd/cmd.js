"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
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
})(CMD = exports.CMD || (exports.CMD = {}));
//# sourceMappingURL=cmd.js.map