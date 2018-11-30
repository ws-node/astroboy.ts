import { Injectable } from "../../src";

@Injectable()
class TestService {

  private value = 555;

  public demoMethod2() {
    return this.value;
  }

}

export = TestService;