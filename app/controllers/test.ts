import TestService from "../services/test";
import { Controller, Context, API } from "../../src";

@Controller("test")
class TestController {

  constructor(private ctx: Context, private test: TestService) {

  }

  @API("GET", "get")
  public Get() {
    console.log(this);
    this.test.reset(4534);
    // @ts-ignore
    this.ctx.body = this.test.demoMethod2();
  }

}

export = TestController;
