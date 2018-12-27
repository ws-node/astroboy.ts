import { Configs } from "../services/Configs";
import { InjectService } from "../services/Injector";
interface IGlobalErrorHandler {
    handler?: (error: any, injector: InjectService, configs: Configs) => void;
}
export declare const defaultGlobalError: IGlobalErrorHandler;
export declare const GLOBAL_ERROR: import("../services/Configs").ConfigToken<IGlobalErrorHandler>;
export {};
