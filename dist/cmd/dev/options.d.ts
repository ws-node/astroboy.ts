import { CommandPlugin } from "../base";
export interface IDevCmdOptions {
    debug: string | boolean;
    env: string;
    port: number | string;
    mock: string | boolean;
    ts: boolean;
    tsconfig: string;
    inspect: boolean;
}
export declare const options: CommandPlugin;
