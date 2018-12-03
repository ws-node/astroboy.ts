import { Injectable, AstroboyContext } from "../../src";

@Injectable()
class BusinessContext extends AstroboyContext {

  public get ctx02() { return this.ctx; }

}

export = BusinessContext;