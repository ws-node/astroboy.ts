import { Render } from "../../services/Render";
import { IViewEngine } from "../../typings/IViewEngine";
import { Configs } from "../../services/Configs";
export declare class NunjunksEngine implements IViewEngine {
    private cfg;
    private rs;
    private "@configs";
    private "@loader";
    private readonly configs;
    private readonly loader;
    private createEnv;
    constructor(cfg: Configs, rs: Render);
    render(name: string, configs: any): Promise<string>;
    renderString(tpl: string, configs: any): Promise<string>;
}
