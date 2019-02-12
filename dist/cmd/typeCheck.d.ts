import * as ts from "typescript/lib/tsserverlibrary";
export declare function compile(fileNames: string[], options: ts.CompilerOptions, notify: (msg: string) => void): void;
export declare function readTsConfig(path: string, parent: string): ts.ParsedCommandLine;
