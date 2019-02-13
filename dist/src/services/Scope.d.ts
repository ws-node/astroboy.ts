import { ScopeID } from "@bonbons/di";
export declare namespace Scope {
    interface Contract {
        readonly id: ScopeID;
        diration(): number;
    }
}
export declare class Scope implements Scope.Contract {
    private _init;
    private scopeId;
    private start;
    private stop;
    readonly id: ScopeID;
    protected init(id: ScopeID): this;
    protected begin(): void;
    protected end(): void;
    diration(): number;
}
