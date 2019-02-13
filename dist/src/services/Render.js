"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isPlainObject_1 = tslib_1.__importDefault(require("lodash/isPlainObject"));
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const decorators_1 = require("../decorators");
const AstroboyContext_1 = require("./AstroboyContext");
const utils_1 = require("../utils");
const json_1 = require("../results/json");
/**
 * ## 统一渲染服务
 * @description
 * @author Big Mogician
 * @export
 * @class Render
 */
let Render = class Render {
    constructor(context) {
        this.context = context;
        this._views = {};
        this.init();
    }
    get views() { return this._views; }
    /**
     * ## Render init
     * * 重载方法已实现新的初始化逻辑
     * @description
     * @author Big Mogician
     * @protected
     * @memberof Render
     */
    init() { }
    setView(...args) {
        const [p1, p2, p3] = args;
        let toSnake = false;
        let isObj = false;
        let keyStr = undefined;
        let toSave = undefined;
        if (isPlainObject_1.default(p1)) {
            const { toSnake: toS = false } = (p2 || {});
            toSnake = toS;
            isObj = true;
            toSave = p1;
        }
        else {
            const { toSnake: toS = false } = (p3 || {});
            toSnake = toS;
            keyStr = p1;
            toSave = p2;
        }
        if (isObj) {
            this._views = Object.assign({}, this._views, (toSnake ?
                utils_1.resolveKeys(json_1.JsonResolvers.snakecase, toSave || {}) :
                (toSave || {})));
        }
        else {
            set_1.default(this._views, keyStr, toSnake ?
                utils_1.resolveKeys(json_1.JsonResolvers.snakecase, toSave || {}) :
                (toSave || {}));
        }
    }
};
Render = tslib_1.__decorate([
    decorators_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [AstroboyContext_1.AstroboyContext])
], Render);
exports.Render = Render;
//# sourceMappingURL=Render.js.map