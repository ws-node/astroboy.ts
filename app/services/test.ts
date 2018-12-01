import { Injectable, Context } from "../../src";
import Test02Service from "./test02";
import T01Service from "./t01";
import T05Service from "./t05";
import T06Service from "./t06";
import T07Service from "./t07";
import T08Service from "./t08";
import T04Service from "./t04";
import T03Service from "./t03";
import T02Service from "./t02";

@Injectable()
class TestService {

  private value = 555;

  public get thisValue() { return this.value; }

  constructor(
    public t01: T01Service,
    public t02: T02Service,
    public t03: T03Service,
    public t04: T04Service,
    public t05: T05Service,
    public t06: T06Service,
    public t07: T07Service,
    public t08: T08Service,
    public context: Context,
    private inner: Test02Service) { }

  public reset(v: number) {
    this.value += v;
  }

  public demoMethod2() {
    return this.thisValue + this.inner.showValue();
  }

}

// @Injectable({
//   token: TestService,
// })
// class B {

//   constructor(
//     public t01: T01Service,
//     public t02: T02Service,
//     public t03: T03Service,
//     public t04: T04Service,
//     public t05: T05Service,
//     public t06: T06Service,
//     public t07: T07Service,
//     public t08: T08Service,
//     public context: Context,
//     private inner: Test02Service) { }

//   public reset(v: number): void {
//     throw new Error("Method not implemented.");
//   }

//   public demoMethod2(): number {
//     throw new Error("Method not implemented.");
//   }


// }

// export = B;
export = TestService;