"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const actions_1 = tslib_1.__importDefault(require("./actions"));
exports.options = {
    name: "router",
    description: "astroboy.ts routers cmd",
    options: [
        ["--enabled [isEnabled]", "open routers-auto-build"],
        ["--always [isAlways]", "set routers-always-rebuild"],
        ["--filetype [fileType]", "set routers fileType"],
        ["--approot [appRoot]", "set routers-root"],
        ["--tsconfig [tsconfig]", "set tsconfig.json"],
        ["--details [showRouters]", "show building results or not"],
    ],
    action: actions_1.default,
    help: () => {
        console.log("");
        console.log("  Examples:");
        console.log("");
        console.log("    $ astt router");
        console.log("    $ astt router --always");
        console.log("    $ astt router --fileType ts");
        console.log("    $ astt router --approot /v1/prj");
        console.log();
    }
};
//# sourceMappingURL=options.js.map