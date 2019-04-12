import {
  IConfigCollection,
  ConfigsCollection as ReadonlyConfigs
} from "@bonbons/di";
import { ConfigToken, ConfigEntry } from "../typings/IConfigs";

export { InjectScope } from "@bonbons/di";

export class RealConfigCollection implements IConfigCollection {
  private map = new Map<symbol, { value: any }>();

  public set<T>(token: ConfigToken<T>, entry: T) {
    this.map.set(token.key, { value: entry });
  }

  public get<T>(token: ConfigToken<T>): T {
    const entry = this.map.get(token.key);
    return entry && entry.value;
  }

  public toArray(): ConfigEntry<any>[] {
    return Array.from(this.map.entries()).map(([sb, { value }]) => ({
      token: { key: sb },
      value
    }));
  }
}

export namespace Configs {
  export interface Contract extends ReadonlyConfigs {}
}

/**
 * ## 全局配置容器
 * @description
 * @author Big Mogician
 * @export
 * @abstract
 * @class Configs
 * @implements {ReadonlyConfigs}
 */
export abstract class Configs implements Configs.Contract {
  /**
   * ### 解析并获得token对应的配置信息
   * @description
   * @author Big Mogician
   * @abstract
   * @template T
   * @param {ConfigToken<T>} token
   * @returns {T}
   * @memberof Configs
   */
  abstract get<T>(token: ConfigToken<T>): T;
}
