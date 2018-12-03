import TestService from "../services/test";
import Test02Service from "../services/test02";
import BusinessContext from "../services/business-context";
import { Controller, API, Configs, AstroboyContext, ENV } from "../../src";

interface GetQuery {
  id: string;
  name: string;
}

@Controller("test")
class TestController {

  constructor(
    private configs: Configs,
    private base: AstroboyContext<{ fakeId: string; }>,
    private business: BusinessContext,
    private test: TestService,
    private test02: Test02Service) {

  }

  @API("GET", "get")
  public Get({ id, name }: GetQuery) {
    const { ctx } = this.base;
    ctx.type = "application/json";
    ctx.body = JSON.stringify({
      id,
      name,
      url: ctx.url,
    });
  }

  @API("GET", "get2")
  public GetMore({ id, name }: GetQuery) {
    this.test02.add(345);
    this.test.reset(4534);
    const env = this.configs.get(ENV);
    // console.log(env);
    // console.log(this.base);
    // throw new Error("fuck");
    const { ctx } = this.base;
    ctx.type = "application/json";
    ctx.body = JSON.stringify({
      status: this.test.demoMethod2(),
      // config: this.base.getConfig(),
      // haha: this.notMethod(),
      // env,
      type: ctx.type,
      id, name,
      ctx: this.business.ctx02 === this.base.ctx,
      t05: this.test.t05 === this.test.t02.t05,
      t08: this.test.t08 === this.test.t06.t08
    });
  }

  private notMethod() {
    return "hahaha";
  }

}

export = TestController;
