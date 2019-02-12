import * as typescript from "typescript";
import { Configuration } from "tslint";
export declare function loadProgramConfig(configFile: string, compilerOptions: typescript.CompilerOptions): typescript.ParsedCommandLine;
interface ConfigurationFile extends Configuration.IConfigurationFile {
    linterOptions?: {
        typeCheck?: boolean;
        exclude?: string[];
    };
}
export declare function loadLinterConfig(configFile: string): ConfigurationFile;
export declare function createProgram(programConfig: typescript.ParsedCommandLine, oldProgram?: typescript.Program): typescript.Program;
export {};
