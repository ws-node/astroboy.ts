"use strict";
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const child_process_1 = require("child_process");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
module.exports = function (_, command) {
    try {
        const tsnode = require.resolve("ts-node");
        const astroboy_ts = require.resolve("astroboy.ts");
        process.env.__TSCONFIG = command.tsconfig || "_";
        console.log(chalk_1.default.cyan("Start building routers ****** "));
        const registerFile = astroboy_ts.replace("/index.js", "/cmd/register");
        const initFile = astroboy_ts.replace("/index.js", "/cmd/init");
        child_process_1.exec(`node -r ${registerFile} ${initFile}`, {
            env: {
                CTOR_PATH: path_1.default.resolve(process.cwd(), "app/controllers"),
                ROUTER_PATH: path_1.default.resolve(process.cwd(), "app/routers"),
                ASTT_ENABLED: command.enabled === undefined ? "true" : String(String(command.enabled) === "true"),
                ASTT_ALWAYS: String(String(command.always) === "true"),
                APP_ROOT: command.approot || "/",
                FILE_TYPE: command.filetype || "js"
            },
        }, (error, stdout, stderr) => {
            if (error) {
                console.log(chalk_1.default.yellow("初始化routers失败"));
                console.log(error);
                return;
            }
            if (stderr) {
                console.log(chalk_1.default.yellow("初始化routers失败"));
                console.log(stderr);
                return;
            }
            console.log(chalk_1.default.blue(stdout));
            console.log(chalk_1.default.green("初始化routers完成"));
        });
    }
    catch (e) {
        console.log(chalk_1.default.yellow("初始化routers失败"));
        if ((e.message || "").includes("ts-node")) {
            console.log(chalk_1.default.red("请安装ts-node"));
            return;
        }
        throw e;
    }
};
//# sourceMappingURL=actions.js.map