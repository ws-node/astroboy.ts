"use strict";
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const nodemon_1 = tslib_1.__importDefault(require("nodemon"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const child_process_1 = require("child_process");
function getProjectConfig() {
    const filePath = process.cwd() + "/ast.json";
    if (fs_1.default.existsSync(filePath)) {
        return require(filePath);
    }
    return {};
}
module.exports = function (_, command) {
    if (_ !== "dev")
        return;
    const projectRoot = process.cwd();
    if (!command.ts && !fs_1.default.existsSync(`${projectRoot}/app/app.js`)) {
        console.log(chalk_1.default.red(`当前项目不存在文件 ${projectRoot}/app/app.js`));
        return;
    }
    if (command.ts && !fs_1.default.existsSync(`${projectRoot}/app/app.ts`)) {
        console.log(chalk_1.default.red(`当前项目不存在文件 ${projectRoot}/app/app.ts`));
        return;
    }
    let config;
    try {
        config = require(path_1.default.resolve(projectRoot, "atc.config.js")) || {};
    }
    catch (_) {
        config = {};
    }
    if (config.verbose === undefined)
        config.verbose = true;
    if (config.env) {
        config.env = Object.assign({}, config.env, { NODE_ENV: command.env ? command.env : config.env.NODE_ENV, NODE_PORT: command.port ? command.port : config.env.NODE_PORT });
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
    if (!config.ignore) {
        config.ignore = [];
    }
    // 传递了 --debug 参数，示例：
    // zan dev --debug
    // zan dev --debug koa:application
    if (command.debug && command.debug === true) {
        config.env.DEBUG = "*";
    }
    else if (command.debug && command.debug !== true) {
        config.env.DEBUG = command.debug;
    }
    // 传递了 --inspect 参数，示例：
    // ast dev --inspect
    const node = `node${!!command.inspect ? " --inspect" : ""}`;
    // 传递了 --ts 参数，示例：
    // ast dev --ts
    if (command.ts) {
        try {
            const tsnode = require.resolve("ts-node");
            const astroboy_ts = require.resolve("astroboy.ts");
            const registerFile = astroboy_ts.replace("/index.js", "/cmd/register");
            const ts_node = `-r ${registerFile}`;
            const tsc_path_map = `-r ${require.resolve("tsconfig-paths").replace("/lib/index.js", "")}/register`;
            // 同时传递了 --ts和--tsconfig 参数，示例：
            // ast dev --ts --tsconfig app/tsconfig.json
            if (command.tsconfig) {
                config.env.__TSCONFIG = command.tsconfig || "-";
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
    }
    else {
        config.env.APP_EXTENSIONS = JSON.stringify(["js"]);
        config.exec = `${node} ${path_1.default.join(projectRoot, "app/app.js")}`;
    }
    // 传递了--mock 参数
    // zan dev --mock
    // zan dev --mock https://127.0.0.1:8001
    if (command.mock) {
        const url = command.mock === true ? "http://127.0.0.1:8001" : command.mock;
        config.env.HTTP_PROXY = url;
        config.env.HTTPS_PROXY = url;
    }
    nodemon_1.default(config).on("start", () => {
        console.log(chalk_1.default.green("应用启动中...\n"));
        console.log(chalk_1.default.green("环境变量："));
        console.log(chalk_1.default.green(`NODE_ENV: \t${config.env.NODE_ENV}`));
        console.log(chalk_1.default.green(`NODE_PORT: \t${config.env.NODE_PORT}`));
        if (config.env.DEBUG) {
            console.log(chalk_1.default.green(`DEBUG: \t${config.env.DEBUG}`));
        }
        if (config.env.HTTP_PROXY) {
            console.log(chalk_1.default.green(`HTTP_PROXY: \t${config.env.HTTP_PROXY}`));
        }
        if (config.env.HTTPS_PROXY) {
            console.log(chalk_1.default.green(`HTTPS_PROXY: \t${config.env.HTTPS_PROXY}`));
        }
        console.log(chalk_1.default.green("\n监听目录变化："));
        for (let i = 0; i < config.watch.length; i++) {
            console.log(chalk_1.default.green(config.watch[i]));
        }
        let execCommand = "npm --registry=http://registry.npm.qima-inc.com outdated ";
        const projectConfig = getProjectConfig();
        if (projectConfig.versionValid && Array.isArray(projectConfig.versionValid)) {
            execCommand += projectConfig.versionValid.join(" ");
        }
        child_process_1.exec(execCommand);
    }).on("quit", () => {
        console.log(chalk_1.default.green("应用退出成功"));
        process.kill(process.pid);
    }).on("restart", (files) => {
        console.log(chalk_1.default.green("监听到文件修改：", files));
    });
};
//# sourceMappingURL=actions.js.map