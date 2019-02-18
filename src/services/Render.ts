import isPlainObject from "lodash/isPlainObject";
import set from "lodash/set";
import { Injectable } from "../decorators";
import { AstroboyContext } from "./AstroboyContext";
import { resolveKeys } from "../utils";
import { JsonResolvers } from "../results/json";

interface IGlobalSetOptions {
  toSnake: boolean;
}

export namespace Render {
  export interface Contract {
    readonly views: any;
    setView(obj: { [prop: string]: any }): void;
    setView(
      obj: { [prop: string]: any },
      options: Partial<IGlobalSetOptions>
    ): void;
    setView(key: string, obj: any): void;
    setView(key: string, obj: any, options: Partial<IGlobalSetOptions>): void;
  }
}

/**
 * ## 统一渲染服务
 * @description
 * @author Big Mogician
 * @export
 * @class Render
 */
@Injectable()
export class Render implements Render.Contract {
  private _views: any = {};

  public get views() {
    return this._views;
  }

  constructor(protected context: AstroboyContext) {
    this.init();
  }

  /**
   * ## Render init
   * * 重载方法已实现新的初始化逻辑
   * @description
   * @author Big Mogician
   * @protected
   * @memberof Render
   */
  protected init() {}

  public setView(obj: { [prop: string]: any }): void;
  public setView(
    obj: { [prop: string]: any },
    options: Partial<IGlobalSetOptions>
  ): void;
  public setView(key: string, obj: any): void;
  public setView(
    key: string,
    obj: any,
    options: Partial<IGlobalSetOptions>
  ): void;
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
        ...(toSnake
          ? resolveKeys(JsonResolvers.snakecase, toSave || {})
          : toSave || {})
      };
    } else {
      set(
        this._views,
        keyStr,
        toSnake
          ? resolveKeys(JsonResolvers.snakecase, toSave || {})
          : toSave || {}
      );
    }
  }
}
