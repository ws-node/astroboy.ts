import { AstroboyContext } from "./AstroboyContext";
import { Injectable } from "../decorators/injectable";

interface BaseCompiler<T> {
  imports?(process: NodeJS.Process): string[];
  procedures?(process: NodeJS.Process): string[];
}

export interface IStrictConfigsCompiler<T> extends BaseCompiler<T> {
  configs(process: NodeJS.Process): T;
}

export interface IConfigsCompiler<T> extends BaseCompiler<T> {
  configs(process: NodeJS.Process): Partial<T>;
}

@Injectable()
export class ConfigReader<T extends { [prop: string]: any } = {}> {
  static Expression<T = any>(expression: string) {
    return Symbol(expression) as any;
  }

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
