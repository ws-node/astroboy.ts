"use strict";
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
module.exports = function (_, command) {
    try {
        const tsnode = require.resolve("ts-node");
        console.log(chalk_1.default.blue("Start building routers ****** "));
        child_process_1.exec(`node -r ${tsnode.replace("/dist/index.js", "")}/register ./init`, (error) => {
            if (error) {
                console.log(chalk_1.default.yellow("初始化routers失败"));
                console.log(error);
                return;
            }
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