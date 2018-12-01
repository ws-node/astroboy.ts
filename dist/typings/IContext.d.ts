/// <reference types="koa-router" />
import Koa from "koa";
export interface IContext extends Koa.Context {
    config: any;
    getConfig(...args: any[]): any;
    getServiceClass(...args: any[]): any;
    /**
     * 获取一个 Service 类实例
     * @param {String} packageName 包名
     * @param {String} serviceName 服务名
     */
    getService(...args: any[]): any;
    /**
     * 调用服务
     * @param {String} service 服务名
     * @param {String} method 方法名
     * @param {Object} args 参数
     */
    callService(service: string, method: string, ...args: any[]): any;
    /**
     * 调用服务
     * @param {String} pkgName 包名
     * @param {String} serviceName 服务名
     * @param {String} methodName 方法名
     * @param {Object} args 参数
     */
    invokeServiceMethod(pkgName: string, service: string, method: string, ...args: any[]): any;
    getLib(...args: any[]): any;
}
