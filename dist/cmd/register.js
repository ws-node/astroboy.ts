const tsnode = require("ts-node");
const tsconfig = process.env.__TSCONFIG;
tsnode.register({
    project: tsconfig === "_" ? undefined : tsconfig,
    pretty: true,
    transpileOnly: true
});
//# sourceMappingURL=register.js.map