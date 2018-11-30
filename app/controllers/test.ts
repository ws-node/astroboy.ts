import { Router, API } from "astroboy-router";
import { BaseClass } from "astroboy";
import TestService from "../services/test";
import { Controller } from "../../src";

@Controller("test")
class TestController {

  constructor(private test: TestService) {

  }

  @API("GET", "get")
  public Get() {
    console.log(this);
    console.log(this.test.demoMethod2());
    // @ts-ignore
    this.ctx.body = this.test.demoMethod2();
  }

}

export = TestController;
