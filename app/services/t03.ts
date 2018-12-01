import { Injectable, Context } from "../../src";
import T05Service from "./t05";
import T06Service from "./t06";
import T07Service from "./t07";
import T08Service from "./t08";
import T04Service from "./t04";

@Injectable()
class T03Service {

  constructor(
    public t04: T04Service,
    public t05: T05Service,
    public t06: T06Service,
    public t07: T07Service,
    public t08: T08Service,
    public context: Context) { }

}

export = T03Service;