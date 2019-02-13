"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const get_1 = tslib_1.__importDefault(require("lodash/get"));
function createCmdConfig(config) {
    return config;
}
exports.createCmdConfig = createCmdConfig;
function mergeCmdConfig(merge, config) {
    const watch = get_1.default(merge, "watch", undefined);
    const ignore = get_1.default(merge, "ignore", undefined);
    const _a = get_1.default(merge, "env", {}), { NODE_ENV: env = undefined, NODE_PORT: port = undefined } = _a, othersEnv = tslib_1.__rest(_a, ["NODE_ENV", "NODE_PORT"]);
    const _b = get_1.default(merge, "env", {}), { NODE_ENV: newEnv = undefined, NODE_PORT: newPort = undefined } = _b, newEnvs = tslib_1.__rest(_b, ["NODE_ENV", "NODE_PORT"]);
    const envIsEmpty = !merge.env && !config.env;
    return {
        tsconfig: get_1.default(merge, "tsconfig", config.tsconfig),
        inspect: get_1.default(merge, "inspect", config.inspect),
        env: envIsEmpty
            ? undefined
            : Object.assign({ NODE_ENV: env === undefined ? newEnv : env, NODE_PORT: port === undefined ? newPort : port }, othersEnv, newEnvs),
        watch: !watch
            ? config.watch
            : config.watch !== false
                ? [...watch, ...(config.watch || [])]
                : false,
        ignore: !ignore
            ? config.ignore
            : config.ignore !== false
                ? [...ignore, ...(config.ignore || [])]
                : false,
        verbose: get_1.default(merge, "verbose", config.verbose),
        debug: get_1.default(merge, "debug", config.debug),
        mock: get_1.default(merge, "mock", config.mock),
        typeCheck: get_1.default(merge, "typeCheck", config.typeCheck),
        transpile: get_1.default(merge, "transpile", config.transpile),
        routers: Object.assign({}, get_1.default(merge, "routers", {}), get_1.default(config, "routers", {}))
    };
}
exports.mergeCmdConfig = mergeCmdConfig;
//# sourceMappingURL=base.js.map