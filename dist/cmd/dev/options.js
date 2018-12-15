"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const actions_1 = tslib_1.__importDefault(require("./actions"));
exports.options = {
    name: "dev",
    description: "本地开发，开启后端服务",
    options: [
        ["-C, --config [atcConfig]", "使用自定义的atc.config.js配置文件"],
        ["-D, --debug [debugName]", "开启 debug 模式"],
        ["-E, --env [NODE_ENV]", "设置 NODE_ENV 环境变量，默认 development"],
        ["-P, --port [NODE_PORT]", "设置 NODE_PORT 环境变量，默认 8201"],
        ["-M, --mock [proxyUrl]", "开启 mock 模式，默认 proxy 地址为 http://127.0.0.1:8001"],
        ["-T, --tsconfig [config]", "使用自定义的ts编译配置文件"],
        ["-I, --inspect [inspect]", "启用inspector，开启编辑器断点调试"]
    ],
    action: actions_1.default,
    help: () => {
        console.log("");
        console.log("  Examples:");
        console.log("");
        console.log("    $ atc dev");
        console.log("    $ atc dev --debug");
        console.log("    $ atc dev --debug koa:application");
        console.log("    $ atc dev --debug --mock");
        console.log("    $ atc dev --mock http://127.0.0.1:8001");
        console.log("    $ atc dev --mock");
        console.log("    $ atc dev --env pre");
        console.log("    $ atc dev --port 8201");
        console.log("    $ atc dev --env development --port 8201");
        console.log("    $ atc dev --tsconfig app/tsconfig.json");
        console.log("    $ atc dev --inspect");
        console.log();
    }
};
//# sourceMappingURL=options.js.map