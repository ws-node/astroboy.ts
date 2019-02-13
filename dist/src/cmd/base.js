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
    const oldEnvs = get_1.default(merge, "env", {});
    const newEnvs = get_1.default(config, "env", {});
    return {
        tsconfig: get_1.default(merge, "tsconfig", config.tsconfig),
        inspect: get_1.default(merge, "inspect", config.inspect),
        env: Object.assign({}, oldEnvs, newEnvs),
        watch: !watch
            ? config.watch
            : config.watch !== false
                ? [...watch, ...(config.watch || [])]
                : [],
        ignore: !ignore
            ? config.ignore
            : config.ignore !== false
                ? [...ignore, ...(config.ignore || [])]
                : [],
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