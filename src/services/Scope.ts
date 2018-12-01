import { Injectable } from "../decorators/injectable";
import { ScopeID } from "@bonbons/di";

@Injectable()
export class Scope {

  private _init = false;
  private scopeId?: ScopeID;
  private start: Date;
  private stop: Date;

  public get id() { return this.scopeId; }

  public init(id: ScopeID) {
    if (this._init) return this;
    this._init = true;
    this.scopeId = id;
    return this;
  }

  public begin() {
    if (!this.start) {
      this.start = new Date();
    }
  }

  public end() {
    if (!this.stop) {
      this.stop = new Date();
    }
  }

  public diration() {
    if (this.start && this.stop) {
      return this.stop.getTime() - this.start.getTime();
    }
    return 0;
  }

}