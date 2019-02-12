"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript = tslib_1.__importStar(require("typescript"));
const path_1 = tslib_1.__importDefault(require("path"));
function loadProgramConfig(configFile, compilerOptions) {
    const tsconfig = typescript.readConfigFile(configFile, typescript.sys.readFile).config;
    tsconfig.compilerOptions = tsconfig.compilerOptions || {};
    tsconfig.compilerOptions = Object.assign({}, tsconfig.compilerOptions, compilerOptions);
    const parsed = typescript.parseJsonConfigFileContent(tsconfig, typescript.sys, path_1.default.dirname(configFile));
    return parsed;
}
exports.loadProgramConfig = loadProgramConfig;
function loadLinterConfig(configFile) {
    // tslint:disable-next-line:no-implicit-dependencies
    const tslint = require("tslint");
    return tslint.Configuration.loadConfigurationFromPath(configFile);
}
exports.loadLinterConfig = loadLinterConfig;
function createProgram(programConfig, 
//   files: FilesRegister,
//   watcher: FilesWatcher,
oldProgram) {
    const host = typescript.createCompilerHost(programConfig.options);
    //   const realGetSourceFile = host.getSourceFile;
    //   host.getSourceFile = (filePath, languageVersion, onError) => {
    // first check if watcher is watching file - if not - check it's mtime
    // if (!watcher.isWatchingFile(filePath)) {
    //   try {
    //     const stats = fs.statSync(filePath);
    //     files.setMtime(filePath, stats.mtime.valueOf());
    //   } catch (e) {
    //     // probably file does not exists
    //     files.remove(filePath);
    //   }
    // }
    // // get source file only if there is no source in files register
    // if (!files.has(filePath) || !files.getData(filePath).source) {
    //   files.mutateData(filePath, data => {
    //     data.source = realGetSourceFile(filePath, languageVersion, onError);
    //   });
    // }
    // return files.getData(filePath).source;
    //   };
    return typescript.createProgram(programConfig.fileNames, programConfig.options, host, oldProgram // re-use old program
    );
}
exports.createProgram = createProgram;
//# sourceMappingURL=typeCheck.js.map