import { Constructor, InjectScope, InjectToken } from "@bonbons/di";
export declare function Injectable(config?: Partial<{
    type: InjectScope;
    token: InjectToken;
}>): <T>(target: Constructor<T>) => Constructor<T>;
