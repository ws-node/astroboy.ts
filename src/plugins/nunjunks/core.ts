import { Injectable } from "../../decorators/injectable";
import { Render } from "../../services/Render";
import { IViewEngine } from "../../typings/IViewEngine";
import { Configs } from "../../services/Configs";
import { NUNJUNKS_OPTIONS, INunjunksRenderOptions } from "./options";
import { FileSystemLoader, Environment } from "nunjucks";

@Injectable()
export class NunjunksEngine implements IViewEngine {
  private "@configs": INunjunksRenderOptions;
  private "@loader": FileSystemLoader;

  private get configs() {
    return (
      this["@configs"] || (this["@configs"] = this.cfg.get(NUNJUNKS_OPTIONS))
    );
  }

  private get loader() {
    return (
      this["@loader"] ||
      (this["@loader"] = new FileSystemLoader(this.configs.root, {
        noCache: !this.configs.cache
      }))
    );
  }

  private createEnv(configs?: INunjunksRenderOptions) {
    return new Environment(
      this.loader,
      !configs ? this.configs : { ...this.configs, ...configs }
    );
  }

  constructor(private cfg: Configs, private rs: Render) {}

  public async render(name: string, configs: any): Promise<string> {
    return this.createEnv(configs).render(name, this.rs.views);
  }

  public async renderString(tpl: string, configs: any): Promise<string> {
    return this.createEnv(configs).renderString(tpl, this.rs.views);
  }
}
