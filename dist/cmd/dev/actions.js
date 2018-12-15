"use strict";
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const nodemon_1 = tslib_1.__importDefault(require("nodemon"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
module.exports = function (_, command) {
    if (_ !== "dev")
        return;
    const projectRoot = process.cwd();
    if (!fs_1.default.existsSync(`${projectRoot}/app/app.ts`)) {
        console.log(chalk_1.default.red(`当前项目不存在文件 ${projectRoot}/app/app.ts`));
        return;
    }
    const fileName = command.config || "atc.config.js";
    let config;
    try {
        config = require(path_1.default.join(projectRoot, fileName)) || {};
    }
    catch (_) {
        config = {};
    }
    if (config.env) {
        config.env = Object.assign({}, config.env, { NODE_ENV: command.env ? command.env : (config.env.NODE_ENV || "development"), NODE_PORT: command.port ? command.port : (config.env.NODE_PORT || 8201) });
    }
    else {
        config.env = {
            NODE_ENV: command.env ? command.env : "development",
            NODE_PORT: command.port ? command.port : 8201
        };
    }
    if (!config.watch) {
        config.watch = [
            path_1.default.join(projectRoot, "app/**/*.*"),
            path_1.default.join(projectRoot, "config/**/*.*"),
            path_1.default.join(projectRoot, "plugins/**/*.*")
        ];
    }
    if (config.verbose === undefined)
        config.verbose = true;
    if (!config.ignore)
        config.ignore = [];
    if (config.inspect === undefined)
        config.inspect = true;
    if (command.debug)
        config.debug = command.debug;
    if (command.tsconfig)
        config.tsconfig = command.tsconfig;
    if (command.mock)
        config.mock = command.mock;
    config.inspect = String(config.inspect) === "true";
    // 传递了 --debug 参数，示例：
    // atc dev --debug
    // atc dev --debug koa:application
    if (config.debug && config.debug === true) {
        config.env.DEBUG = "*";
    }
    else if (config.debug && config.debug !== true) {
        config.env.DEBUG = config.debug;
    }
    // 传递了 --inspect 参数，示例：
    // atc dev --inspect
    const node = `node${!!config.inspect ? " --inspect" : ""}`;
    try {
        const tsnode = require.resolve("ts-node");
        const astroboy_ts = require.resolve("astroboy.ts");
        const registerFile = astroboy_ts.replace("/index.js", "/cmd/register");
        const ts_node = `-r ${registerFile}`;
        const tsc_path_map = `-r ${require.resolve("tsconfig-paths").replace("/lib/index.js", "")}/register`;
        // 传递了 --tsconfig 参数，示例：
        // atc dev --tsconfig app/tsconfig.json
        if (config.tsconfig) {
            config.env.__TSCONFIG = config.tsconfig || "-";
        }
        config.env.APP_EXTENSIONS = JSON.stringify(["js", "ts"]);
        config.exec = `${node} ${ts_node} ${tsc_path_map} ${path_1.default.join(projectRoot, "app/app.ts")}`;
    }
    catch (error) {
        if ((error.message || "").includes("ts-node")) {
            console.log(chalk_1.default.red("请安装ts-node"));
        }
        else {
            throw error;
        }
    }
    // 传递了--mock 参数
    // atc dev --mock
    // atc dev --mock https://127.0.0.1:8001
    if (config.mock) {
        const url = config.mock === true ? "http://127.0.0.1:8001" : config.mock;
        config.env.HTTP_PROXY = url;
        config.env.HTTPS_PROXY = url;
    }
    nodemon_1.default(config).on("start", () => {
        console.log(chalk_1.default.green("应用启动中...\n"));
        console.log(chalk_1.default.green("环境变量："));
        console.log(chalk_1.default.cyan(`NODE_ENV: \t${config.env.NODE_ENV}`));
        console.log(chalk_1.default.cyan(`NODE_PORT: \t${config.env.NODE_PORT}`));
        if (config.env.DEBUG) {
            console.log(chalk_1.default.yellow(`DEBUG: \t${config.env.DEBUG}`));
        }
        if (config.env.HTTP_PROXY) {
            console.log(chalk_1.default.cyan(`HTTP_PROXY: \t${config.env.HTTP_PROXY}`));
        }
        if (config.env.HTTPS_PROXY) {
            console.log(chalk_1.default.cyan(`HTTPS_PROXY: \t${config.env.HTTPS_PROXY}`));
        }
        console.log(chalk_1.default.green("\n监听目录变化："));
        for (let i = 0; i < config.watch.length; i++) {
            console.log(chalk_1.default.yellow(config.watch[i]));
        }
    }).on("quit", () => {
        console.log(chalk_1.default.green("应用退出成功"));
        process.kill(process.pid);
    }).on("restart", (files) => {
        console.log(chalk_1.default.yellow("监听到文件修改：", files));
    });
};
//# sourceMappingURL=actions.js.map