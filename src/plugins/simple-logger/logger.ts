import chalk from "chalk";
import { Injectable } from "../../decorators/injectable";
import { Configs } from "../../services/Configs";
import { SIMPLE_LOGGER_OPTIONS, ISimpleLoggerOptions } from "./options";
import { SimpleLogLevel } from "./base";

function createStamp(date?: Date): string {
  const tData = date || new Date();
  const mili = tData.getMilliseconds();
  return `[${chalk.cyan(
    `${tData.toLocaleDateString()} ${tData.toLocaleTimeString()}:${
      mili < 100 ? `0${mili}` : mili
    }`
  )}]-`;
}

function createType(type: SimpleLogLevel): string {
  let color: string;
  let tps: string;
  switch (type) {
    case SimpleLogLevel.FATAL:
    case SimpleLogLevel.ERROR:
      [color, tps] = ["red", "ERROR"];
      break;
    case SimpleLogLevel.WARN:
      [color, tps] = ["yellow", "WARN"];
      break;
    case SimpleLogLevel.INFO:
      [color, tps] = ["blue", "INFO"];
      break;
    case SimpleLogLevel.DEBUG:
      [color, tps] = ["green", "DEBUG"];
      break;
    default:
      [color, tps] = ["white", "TRACE"];
  }
  return `[${chalk[color](tps)}]-`;
}

@Injectable()
export class SimpleLogger {
  private pkgEnv: ISimpleLoggerOptions;

  constructor(private configs: Configs) {
    this.pkgEnv = this.configs.get(SIMPLE_LOGGER_OPTIONS);
  }

  private log(level: SimpleLogLevel, ...args: any[]) {
    if (level < this.pkgEnv.level) return;
    const [title, details] = args;
    console.log(`${createStamp()}${createType(level)}${title}`);
    if (details) {
      console.log(details);
    }
  }

  public trace(title: string): void;
  public trace(title: string, details: any): void;
  public trace(...msg: any[]) {
    return this.log(SimpleLogLevel.TRACE, ...msg);
  }

  public debug(title: string): void;
  public debug(title: string, details: any): void;
  public debug(...msg: any[]) {
    return this.log(SimpleLogLevel.DEBUG, ...msg);
  }
}
