import { Injectable } from "../decorators/injectable";
import { ScopeID } from "@bonbons/di";

export namespace Scope {
  export interface Contract {
    readonly id: ScopeID;
    diration(): number;
  }
}

@Injectable()
export class Scope implements Scope.Contract {

  private _init = false;
  private scopeId!: ScopeID;
  private start!: Date;
  private stop!: Date;

  public get id() { return this.scopeId; }

  protected init(id: ScopeID) {
    if (this._init) return this;
    this._init = true;
    this.scopeId = id;
    return this;
  }

  protected begin() {
    if (!this.start) {
      this.start = new Date();
    }
  }

  protected end() {
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