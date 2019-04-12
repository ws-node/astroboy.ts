export interface ConfigToken<T> {
  key: symbol;
}

export interface ConfigEntry<T> {
  token: ConfigToken<T>;
  value: T;
}

export type TokenGenerator = <T>(key: string) => ConfigToken<T>;

export const createOptions: TokenGenerator = (key: string) => ({
  key: Symbol(key)
});
export const createConfig: TokenGenerator = (key: string) => ({
  key: Symbol(`config::${key}`)
});
