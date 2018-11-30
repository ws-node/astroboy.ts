import { Injectable } from "../../src";

@Injectable()
class TestService {

  private value = 555;

  public reset(v: number) {
    this.value += v;
  }

  public demoMethod2() {
    return this.value;
  }

}

export = TestService;