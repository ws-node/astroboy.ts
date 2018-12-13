export interface ICmdOptions {
    enabled?: boolean;
    always?: boolean;
    filetype?: string;
    approot?: string;
    details?: string;
    tsconfig?: string;
}
export declare const options: {
    name: string;
    description: string;
    options: string[][];
    action: (_: any, command: ICmdOptions) => void;
    help: () => void;
};
