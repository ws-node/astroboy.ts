import { InjectDIToken } from "@bonbons/di";
export declare abstract class InjectService {
    abstract get<T>(token: InjectDIToken<T>): T;
}
