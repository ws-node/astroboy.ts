"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const router_1 = require("./router");
const dev_1 = require("./dev");
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
function initCommand(plugin) {
    const program = commander_1.default.name(plugin.name).description(plugin.description);
    if (plugin.options) {
        for (let i = 0; i < plugin.options.length; i++) {
            program.option(plugin.options[i][0], plugin.options[i][1]);
        }
    }
    program.action(plugin.action).on("--help", plugin.help);
}
[dev_1.DevPlugin, router_1.RouterPlugin].forEach(i => initCommand(i));
commander_1.default.version("1.0.0-rc.1").parse(process.argv);
if (commander_1.default.args.length === 0) {
    commander_1.default.outputHelp();
}
//# sourceMappingURL=index.js.map