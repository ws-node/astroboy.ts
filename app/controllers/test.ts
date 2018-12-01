import TestService from "../services/test";
import Test02Service from "../services/test02";
import { Controller, API, Configs, AST_BASE, AstroboyContext, ENV } from "../../src";

@Controller("test")
class TestController {

  constructor(
    private configs: Configs,
    private base: AstroboyContext<{ fakeId: string; type: number }>,
    private test: TestService,
    private test02: Test02Service) {

  }

  @API("GET", "get")
  public Get() {
    this.test02.add(345);
    this.test.reset(4534);
    const configBase = this.configs.get(AST_BASE);
    const env = this.configs.get(ENV);
    // console.log(configBase);
    // console.log(env);
    // console.log(this.base);
    const { ctx } = this.base;
    ctx.body = JSON.stringify({
      status: this.test.demoMethod2(),
      config: this.base.getConfig(),
      haha: this.notMethod(),
      env,
      configBase,
      type: ctx.type
    });
  }

  private notMethod() {
    return "hahaha";
  }

}

export = TestController;
