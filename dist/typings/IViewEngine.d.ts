import { Async } from "./IResult";
export interface IViewEngine {
    render(path: string, configs: any): Async<string>;
    renderString(path: string, configs: any): Async<string>;
}
