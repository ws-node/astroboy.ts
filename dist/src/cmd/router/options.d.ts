import { CommandPlugin } from "../base";
export interface IRouterCmdOptions {
    config?: string;
    enabled?: boolean;
    always?: boolean;
    filetype?: string;
    approot?: string;
    details?: string;
    tsconfig?: string;
}
export declare const options: CommandPlugin;
