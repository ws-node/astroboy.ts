import { Injectable, Context } from "../../src";
import T07Service from "./t07";
import T08Service from "./t08";

@Injectable()
class T06Service {

  constructor(
    public t07: T07Service,
    public t08: T08Service,
    public context: Context) { }

}

export = T06Service;