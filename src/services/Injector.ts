import { InjectDIToken } from "@bonbons/di";

export abstract class InjectService {
  abstract get<T>(token: InjectDIToken): T;
}