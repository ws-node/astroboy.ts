/**
 * Astroboy的配置的view结构
 * @description
 * @author Big Mogician
 * @interface IView
 */
interface IView {
    cache: boolean;
    root: string;
    defaultExtension: string;
    defaultViewEngine: string;
    mapping: {
        [prop: string]: any;
    };
}
export declare const defaultView: Partial<IView>;
/** astroboy view config */
export declare const CONFIG_VIEW: import("../services/Configs").ConfigToken<IView>;
export {};
