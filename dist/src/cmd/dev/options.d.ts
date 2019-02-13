import { CommandPlugin } from "../base";
export interface IDevCmdOptions {
    config: string;
    debug: string | boolean;
    env: string;
    port: number | string;
    mock: string | boolean;
    tsconfig: string;
    inspect: boolean;
}
export declare const options: CommandPlugin;
