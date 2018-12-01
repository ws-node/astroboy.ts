import { Constructor } from "@bonbons/di";
/**
 * ## 定义控制器
 * * routes部分由astroboy-router实现
 * @description
 * @author Big Mogician
 * @export
 * @param {string} prefix
 * @returns
 */
export declare function Controller(prefix: string): <T>(target: Constructor<T>) => Constructor<T>;
