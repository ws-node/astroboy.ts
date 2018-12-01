import { ScopeID } from "@bonbons/di";
export declare class Scope {
    private _init;
    private scopeId?;
    private start;
    private stop;
    readonly id: ScopeID;
    init(id: ScopeID): this;
    begin(): void;
    end(): void;
    diration(): number;
}
