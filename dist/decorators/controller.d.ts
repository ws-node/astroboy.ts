import { Constructor } from "@bonbons/di";
export declare function Controller(prefix: string): <T>(target: Constructor<T>) => Constructor<T>;
