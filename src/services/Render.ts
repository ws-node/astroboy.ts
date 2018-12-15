import isPlainObject from "lodash/isPlainObject";
import set from "lodash/set";
import { Injectable } from "../decorators";
import { AstroboyContext } from "./AstroboyContext";
import { resolveKeys } from "../utils";
import { JsonResolvers } from "../results/json";

interface IGlobalSetOptions {
  toSnake: boolean;
}

@Injectable()
export class Render {

  private _views: any = {};

  public get views() { return this._views; }

  constructor(private context: AstroboyContext) { }

  public setView(obj: { [prop: string]: any }): void;
  public setView(obj: { [prop: string]: any }, options: Partial<IGlobalSetOptions>): void;
  public setView(key: string, obj: any): void;
  public setView(key: string, obj: any, options: Partial<IGlobalSetOptions>): void;
  public setView(...args: any[]) {
    const [p1, p2, p3] = args;
    let toSnake = false;
    let isObj = false;
    let keyStr: string = undefined;
    let toSave: any = undefined;
    if (isPlainObject(p1)) {
      const { toSnake: toS = false } = <Partial<IGlobalSetOptions>>(p2 || {});
      toSnake = toS;
      isObj = true;
      toSave = p1;
    } else {
      const { toSnake: toS = false } = <Partial<IGlobalSetOptions>>(p3 || {});
      toSnake = toS;
      keyStr = p1;
      toSave = p2;
    }
    if (isObj) {
      this._views = {
        ...this._views,
        ...(toSnake ?
          resolveKeys(JsonResolvers.snakecase, toSave || {}) :
          (toSave || {})
        )
      };
    } else {
      set(
        this._views,
        keyStr,
        toSnake ?
          resolveKeys(JsonResolvers.snakecase, toSave || {}) :
          (toSave || {})
      );
    }
  }

}