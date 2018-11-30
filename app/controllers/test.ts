import TestService from "../services/test";
import { Controller, Context, API, BaseClass } from "../../src";

@Controller("test")
class TestController extends BaseClass {

  constructor(private context: Context, private test: TestService) {
    super(context.ctx);
  }

  @API("GET", "get")
  public Get() {
    console.log(this);
    this.test.reset(4534);
    this.ctx.body = JSON.stringify({
      status: this.test.demoMethod2(),
      config: this.getConfig()
    });
  }

}

export = TestController;
