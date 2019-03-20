import { AstroboyContext } from "./AstroboyContext";
import { Injectable } from "../decorators/injectable";

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
