import { DIContainer, Constructor } from "@bonbons/di";
export declare const GlobalDI: DIContainer;
export declare const GlobalSourceDI: DIContainer;
export declare const GlobalImplements: Map<any, any>;
export declare const GlobalServiceMeta: Map<any, any>;
export declare class Server {
    private appBuilder;
    private appConfigs?;
    private di;
    constructor(appBuilder: Constructor<any>, appConfigs?: any);
    static Create(ctor: Constructor<any>, configs?: any): Server;
    run(onStart?: () => void): void;
}
