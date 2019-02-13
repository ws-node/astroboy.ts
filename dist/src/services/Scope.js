"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const injectable_1 = require("../decorators/injectable");
let Scope = class Scope {
    constructor() {
        this._init = false;
    }
    get id() { return this.scopeId; }
    init(id) {
        if (this._init)
            return this;
        this._init = true;
        this.scopeId = id;
        return this;
    }
    begin() {
        if (!this.start) {
            this.start = new Date();
        }
    }
    end() {
        if (!this.stop) {
            this.stop = new Date();
        }
    }
    diration() {
        if (this.start && this.stop) {
            return this.stop.getTime() - this.start.getTime();
        }
        return 0;
    }
};
Scope = tslib_1.__decorate([
    injectable_1.Injectable()
], Scope);
exports.Scope = Scope;
//# sourceMappingURL=Scope.js.map