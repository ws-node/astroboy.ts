import { Injectable, InjectScope } from "../../src";

@Injectable({ type: InjectScope.Singleton })
class Test02Service {

  private value = 98765;

  public add(v: number) {
    this.value += v;
  }

  public showValue() {
    return this.value;
  }

}

export = Test02Service;