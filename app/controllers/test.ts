import TestService from "../services/test";
import Test02Service from "../services/test02";
import BusinessContext from "../services/business-context";
import { Controller, API, Configs, AstroboyContext, ENV, JsonResult } from "../../src";

interface GetQuery {
  id: string;
  name: string;
  fuck: string;
}

interface PostData {
  id: number;
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

  @API("POST", "post/:type")
  public async Post({ id, name }: PostData, { type, id: id2 }) {
    return new JsonResult({
      id, name, type, id2
    });
  }

  @API("GET", "get2/:fuck")
  public async GetMore({ id, name, fuck }: GetQuery) {
    this.test02.add(345);
    this.test.reset(4534);
    // const env = this.configs.get(ENV);
    // console.log(env);
    // console.log(this.base);
    // throw new Error("fuck");
    // await this.delay(250);
    // console.log(this.base.config);
    return new JsonResult({
      status: this.test.demoMethod2(),
      // config: this.base.getConfig(),
      // haha: this.notMethod(),
      // env,
      query_id: id,
      query_name: name,
      query_fuck: fuck,
      ctx: this.business.ctx === this.base.ctx,
      t05: this.test.t05 === this.test.t02.t05,
      t08: this.test.t08 === this.test.t06.t08
    });
  }

  private notMethod() {
    return "hahaha";
  }

  private delay(time = 100) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

}

export = TestController;
