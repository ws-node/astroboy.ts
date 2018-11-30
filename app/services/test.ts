import { Injectable } from "../../src";
import Test02Service from "./test02";

@Injectable()
class TestService {

  private value = 555;

  constructor(private inner: Test02Service) { }

  public reset(v: number) {
    this.value += v;
  }

  public demoMethod2() {
    return this.value + this.inner.showValue();
  }

}

export = TestService;