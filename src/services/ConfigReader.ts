import { AstroboyContext } from "./AstroboyContext";
import { Injectable } from "../decorators/injectable";

export interface IStrictConfigsCompiler<T> {
  configs(process: NodeJS.Process): T;
}

export interface IConfigsCompiler<T> {
  configs(process: NodeJS.Process): Partial<T>;
}

@Injectable()
export class ConfigReader<T extends { [prop: string]: any } = {}> {
  public get global(): T {
    return this.read();
  }

  constructor(private __context: AstroboyContext) {}

  public read<K extends keyof T>(key: K): T[K];
  public read(): T;
  public read(key?: string): any {
    return this.__context.ctx.getConfig(key);
  }
}
