"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const actions_1 = tslib_1.__importDefault(require("./actions"));
exports.options = {
    name: "router",
    description: "astroboy.ts routers cmd",
    options: [
        ["-C, --config [atcConfig]", "use atc.config.js"],
        ["-E, --enabled [isEnabled]", "open routers-auto-build"],
        ["-A, --always [isAlways]", "set routers-always-rebuild"],
        ["-F, --filetype [fileType]", "set routers fileType"],
        ["-R, --approot [appRoot]", "set routers-root"],
        ["-T, --tsconfig [tsconfig]", "set tsconfig.json"],
        ["-D, --details [showRouters]", "show building results or not"],
    ],
    action: actions_1.default,
    help: () => {
        console.log("");
        console.log("  Examples:");
        console.log("");
        console.log("    $ atc router");
        console.log("    $ atc router --always");
        console.log("    $ atc router --fileType ts");
        console.log("    $ atc router --approot /v1/prj");
        console.log();
    }
};
//# sourceMappingURL=options.js.map