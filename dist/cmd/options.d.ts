export interface ICmdOptions {
    enabled?: boolean;
    always?: boolean;
    filetype?: string;
    approot?: string;
    tsconfig?: string;
}
export declare const options: {
    name: string;
    description: string;
    options: string[][];
    action: (command: ICmdOptions) => void;
    help: () => void;
};
