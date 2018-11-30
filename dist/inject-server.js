"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@bonbons/di");
const Context_1 = require("./services/Context");
const Injector_1 = require("./services/Injector");
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
        exports.GlobalDI.register(Injector_1.InjectService, (scopeId) => ({
            get: (token) => this.di.get(token, scopeId),
            INTERNAL_dispose: () => this.di.dispose(scopeId),
            scopeId
        }), di_1.InjectScope.Scope);
        exports.GlobalDI.register(Context_1.Context, (scopeId, { ctx = null } = {}) => {
            if (ctx === null)
                throw new Error("invalid call, you can only call a context in request pipe scope.");
            return new Context_1.Context(ctx);
        }, di_1.InjectScope.Scope);
        new this.appBuilder(this.appConfigs || {}).on("start", () => {
            exports.GlobalSourceDI.complete();
            exports.GlobalDI.complete();
            Array.from(exports.GlobalDI["map"].entries()).forEach(([t, i]) => {
                const tempInstance = exports.GlobalSourceDI.get(t);
                if (!tempInstance)
                    return;
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