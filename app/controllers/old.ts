import { Router, API, BaseClass } from "../../src";
import OldService from "../services/old";

interface GetQuery {
  id: string;
  name: string;
}

@Router("old")
class OldController extends BaseClass {

  constructor(ctx) {
    super(ctx);
  }

  @API("GET", "get")
  public Get() {
    const { id, name } = this.ctx.query as GetQuery;
    const old = new OldService(this.ctx);
    this.ctx.type = "application/json";
    this.ctx.body = JSON.stringify({
      id,
      name,
      url: old.getUrl()
    });
  }

  private notMethod() {
    return "hahaha";
  }

}

export = OldController;
