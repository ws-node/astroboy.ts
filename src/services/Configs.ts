import {
  IToken, ITokenGenerator,
  IEntry, IConfigCollection,
  ConfigsCollection as ReadonlyConfigs
} from "@bonbons/di";

export type ConfigToken<T> = IToken<T>;
export type ConfigEntry<T> = IEntry<T>;

export const createToken: ITokenGenerator = (key: string) => ({ key: Symbol(`ASTROBOY-TS-TOKEN:${key}`) });

export class ConfigCollection implements IConfigCollection {

  private map = new Map<symbol, { value: any }>();

  public set<T>(token: ConfigToken<T>, entry: T) {
    this.map.set(token.key, { value: entry });
  }

  public get<T>(token: ConfigToken<T>): T {
    const entry = this.map.get(token.key);
    return entry && entry.value;
  }

  public toArray(): ConfigEntry<any>[] {
    return Array.from(this.map.entries()).map(([sb, { value }]) => ({ token: { key: sb }, value }));
  }

}

export abstract class Configs implements ReadonlyConfigs {
  abstract get<T>(token: ConfigToken<T>): T;
}
