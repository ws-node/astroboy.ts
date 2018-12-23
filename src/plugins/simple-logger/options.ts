import { createOptions } from "../../services/Configs";
import { SimpleLogLevel } from "./base";

export interface ISimpleLoggerOptions {
  level: SimpleLogLevel | number;
}

export const defaultSimpleLoggerOptions: ISimpleLoggerOptions = {
  level: SimpleLogLevel.WARN
};

export const SIMPLE_LOGGER_OPTIONS = createOptions<ISimpleLoggerOptions>("SIMPLE_LOGGER_OPTIONS");
