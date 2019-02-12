import * as typescript from "typescript";
import { Configuration } from "tslint";
import path from "path";

export function loadProgramConfig(
  configFile: string,
  compilerOptions: typescript.CompilerOptions
) {
  const tsconfig = typescript.readConfigFile(
    configFile,
    typescript.sys.readFile
  ).config;

  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions = {
    ...tsconfig.compilerOptions,
    ...compilerOptions
  };

  const parsed = typescript.parseJsonConfigFileContent(
    tsconfig,
    typescript.sys,
    path.dirname(configFile)
  );

  return parsed;
}

interface ConfigurationFile extends Configuration.IConfigurationFile {
  linterOptions?: {
    typeCheck?: boolean;
    exclude?: string[];
  };
}

export function loadLinterConfig(configFile: string): ConfigurationFile {
  // tslint:disable-next-line:no-implicit-dependencies
  const tslint = require("tslint");

  return tslint.Configuration.loadConfigurationFromPath(
    configFile
  ) as ConfigurationFile;
}

export function createProgram(
  programConfig: typescript.ParsedCommandLine,
  //   files: FilesRegister,
  //   watcher: FilesWatcher,
  oldProgram?: typescript.Program
) {
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

  return typescript.createProgram(
    programConfig.fileNames,
    programConfig.options,
    host,
    oldProgram // re-use old program
  );
}
