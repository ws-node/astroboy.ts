import { Injectable } from "../../src";
import Test02Service from "./test02";

@Injectable()
class TestService {

  private value = 555;

  public get thisValue() { return this.value; }

  constructor(private inner: Test02Service) { }

  public reset(v: number) {
    this.value += v;
  }

  public demoMethod2() {
    return this.thisValue + this.inner.showValue();
  }

}

export = TestService;