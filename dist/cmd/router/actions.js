"use strict";
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const get_1 = tslib_1.__importDefault(require("lodash/get"));
const child_process_1 = require("child_process");
const loadConfig_1 = require("../utils/loadConfig");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
function showRoutes(obj, preK) {
    let count = 0;
    Object.keys(obj || {}).forEach(k => {
        if (typeof obj[k] === "string") {
            console.log(chalk_1.default.blue(!preK ? `--> ${k}` : `--> ${preK}/${k}`));
            count += 1;
        }
        else {
            count += showRoutes(obj[k], !preK ? k : `${preK}/${k}`);
        }
    });
    return count;
}
module.exports = function (_, command) {
    if (_ !== "router")
        return;
    console.log(chalk_1.default.green("========= [ASTROBOY.TS] <==> ROUTER ========"));
    const fileName = command.config || "atc.config.js";
    console.log(`${chalk_1.default.white("尝试加载配置文件 : ")}${chalk_1.default.yellow(fileName)}`);
    let config;
    const defaultConfigs = {
        enabled: true,
        always: false,
        approot: "",
        filetype: "js",
        details: false,
        tsconfig: undefined
    };
    try {
        const req = loadConfig_1.loadConfig(process.cwd(), fileName);
        config = Object.assign({}, defaultConfigs, get_1.default(req, "routers", {}), { tsconfig: req.tsconfig || config.tsconfig });
    }
    catch (_) {
        config = defaultConfigs;
    }
    if (command.enabled)
        config.enabled = String(command.enabled) === "true";
    if (command.always)
        config.always = String(command.always) === "true";
    if (command.details)
        config.details = String(command.details) === "true";
    if (command.approot)
        config.approot = command.approot;
    if (command.filetype)
        config.filetype = command.filetype;
    if (command.tsconfig)
        config.tsconfig = command.tsconfig;
    try {
        const tsnode = require.resolve("ts-node");
        console.log(chalk_1.default.cyan("正在构建路由，请稍候...\n"));
        const astroboy_ts = require.resolve("astroboy.ts");
        const registerFile = astroboy_ts.replace("/index.js", "/cmd/register");
        const initFile = astroboy_ts.replace("/index.js", "/cmd/init");
        console.log(chalk_1.default.yellow("开始执行路由初始化逻辑："));
        console.log(`script ==> ${chalk_1.default.grey(initFile)}`);
        child_process_1.exec(`node -r ${registerFile} ${initFile}`, {
            env: {
                CTOR_PATH: path_1.default.resolve(process.cwd(), "app/controllers"),
                ROUTER_PATH: path_1.default.resolve(process.cwd(), "app/routers"),
                ASTT_ENABLED: config.enabled === undefined
                    ? "true"
                    : String(!!config.enabled === true),
                ASTT_ALWAYS: String(!!config.always),
                APP_ROOT: config.approot || "",
                FILE_TYPE: config.filetype || "js",
                SHOW_ROUTERS: String(!!config.details),
                __TSCONFIG: config.tsconfig || "_"
            }
        }, (error, stdout, stderr) => {
            if (error) {
                console.log(chalk_1.default.yellow("初始化routers失败."));
                console.log(chalk_1.default.red(error));
                console.log("--------------------");
                return;
            }
            if (stderr) {
                console.log(chalk_1.default.yellow("初始化routers失败.."));
                console.log(chalk_1.default.red(stderr));
                console.log("--------------------");
                return;
            }
            try {
                const count = showRoutes(JSON.parse(stdout || "{}") || {});
                console.log(chalk_1.default.green(`路由初始化完成${chalk_1.default.white(`[${count}]`)}`));
            }
            catch (_) {
                console.log(chalk_1.default.yellow("初始化routers失败..."));
                console.log(chalk_1.default.red(_));
                console.log("--------------------");
            }
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