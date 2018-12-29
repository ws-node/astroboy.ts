import { SimpleLogLevel } from "./base";
export interface ISimpleLoggerOptions {
    level: SimpleLogLevel | number;
}
export declare const defaultSimpleLoggerOptions: ISimpleLoggerOptions;
export declare const SIMPLE_LOGGER_OPTIONS: import("../../services/Configs").ConfigToken<ISimpleLoggerOptions>;
