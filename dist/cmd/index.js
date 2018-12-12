"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const options_1 = require("./options");
function initCommand() {
    const program = commander_1.default
        .name(options_1.options.name)
        .description(options_1.options.description);
    if (options_1.options.options) {
        for (let i = 0; i < options_1.options.options.length; i++) {
            program.option(options_1.options.options[i][0], options_1.options.options[i][1]);
        }
    }
    program.action(options_1.options.action).on("--help", options_1.options.help);
    return program;
}
const program = initCommand()
    .version("1.0.0-rc.1")
    .parse(process.argv);
if (program.args.length === 0) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map