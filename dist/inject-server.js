"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
exports.GlobalDI = new di_1.DIContainer();
exports.GlobalSourceDI = new di_1.DIContainer();
exports.GlobalImplements = new Map();
exports.GlobalServiceMeta = new Map();
class Server {
    constructor(appBuilder, appConfigs) {
        this.appBuilder = appBuilder;
        this.appConfigs = appConfigs;
        this.di = exports.GlobalDI;
    }
    static Create(ctor, configs) {
        return new Server(ctor, configs);
    }
    run(onStart) {
        new this.appBuilder(this.appConfigs || {}).on("start", () => {
            exports.GlobalSourceDI.complete();
            exports.GlobalDI.complete();
            Array.from(exports.GlobalDI["map"].entries()).forEach(([t, i]) => {
                const tempInstance = exports.GlobalSourceDI.get(t);
                const data = {};
                Object.getOwnPropertyNames(tempInstance).forEach(name => {
                    data[name] = tempInstance[name];
                });
                exports.GlobalServiceMeta.set(t, data);
            });
            onStart && onStart();
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=inject-server.js.map