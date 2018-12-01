import { InjectDIToken, ScopeID } from "@bonbons/di";

export abstract class InjectService {
  abstract scopeId: ScopeID;
  abstract get<T>(token: InjectDIToken<T>): T;
  protected abstract INTERNAL_dispose(): void;
}