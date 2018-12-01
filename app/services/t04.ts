import { Injectable, Context } from "../../src";
import T06Service from "./t06";
import T07Service from "./t07";
import T08Service from "./t08";
import T05Service from "./t05";

@Injectable()
class T04Service {

  constructor(
    public t05: T05Service,
    public t06: T06Service,
    public t07: T07Service,
    public t08: T08Service,
    public context: Context) { }

}

export = T04Service;