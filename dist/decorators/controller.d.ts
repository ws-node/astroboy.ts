import { Constructor } from "@bonbons/di";
declare module "koa" {
    interface Request {
        body: any;
    }
}
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
export declare function copyPrototype<T>(DI_CONTROLLER: Constructor<any>, target: Constructor<T>): void;
