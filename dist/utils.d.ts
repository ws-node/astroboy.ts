import { Constructor, DIContainer, ConfigsCollection, ScopeID } from "@bonbons/di";
import { InjectService } from "./services/Injector";
import { IContext } from "./typings/IContext";
export declare const Colors: {
    reset: string;
    red: string;
    green: string;
    blue: string;
    yellow: string;
    cyan: string;
    magenta: string;
    white: string;
};
export declare function setColor(name: keyof typeof Colors, value: any): string;
export declare const GlobalDI: DIContainer;
export declare const GlobalImplements: Map<any, any>;
export declare function setScopeId(ctx: IContext): string;
export declare function getScopeId(ctx: IContext, short?: boolean): ScopeID;
export declare function getShortScopeId(scopeId: ScopeID): ScopeID;
export declare function getInjector(ctx: IContext): InjectService;
export declare function resolveDepts<T>(target: Constructor<T>, ctx: IContext): any[];
export declare function createInstance<T>(target: Constructor<T>, ctx: IContext): T;
export declare function optionAssign(configs: ConfigsCollection, token: any, newValue: any): any;
export declare function isCustomClassInstance(obj: any, type?: any): boolean;
export declare function getPrototypeConstructor(obj: any): any;