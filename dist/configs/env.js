"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configs_1 = require("../services/Configs");
exports.defaultEnv = {
    showTrace: false,
    diType: "native"
};
/** astroboy.ts环境变量 */
exports.ENV = Configs_1.createToken("config::@astroboy.ts");
//# sourceMappingURL=env.js.map