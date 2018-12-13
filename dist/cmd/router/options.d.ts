import { CommandPlugin } from "../base";
export interface IRouterCmdOptions {
    enabled?: boolean;
    always?: boolean;
    filetype?: string;
    approot?: string;
    details?: string;
    tsconfig?: string;
}
export declare const options: CommandPlugin;
