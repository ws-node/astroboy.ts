import { SingletonBasement as ReactiveSingleton } from "@bonbons/di";
import { getPropertyType } from "../utils";

export function Watch() {
  return function<T>(prototype: T, propertyKey: string) {
    const watch = prototype["@watch"] || {};
    const override = prototype["@override"] || [];
    watch[propertyKey] = {
      token: getPropertyType(prototype, propertyKey) || Object
    };
    override.push(propertyKey);
    Object.defineProperty(prototype, propertyKey, {
      get() {
        return this["delegate"][propertyKey];
      },
      enumerable: true,
      configurable: false
    });
    prototype["@override"] = override;
    prototype["@watch"] = watch;
  };
}

export { ReactiveSingleton };
