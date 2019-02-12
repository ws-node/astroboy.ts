"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
class FsHelper {
    static existsSync(filePath) {
        try {
            fs.statSync(filePath);
        }
        catch (err) {
            if (err.code === "ENOENT") {
                return false;
            }
            else {
                throw err;
            }
        }
        return true;
    }
}
exports.FsHelper = FsHelper;
//# sourceMappingURL=FsHelper.js.map