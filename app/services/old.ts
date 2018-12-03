import { BaseClass } from "../../src";

class OldService extends BaseClass {

  getUrl() {
    return this.ctx.url;
  }

}

export = OldService;
