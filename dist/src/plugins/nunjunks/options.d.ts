export interface INunjunksRenderOptions {
    root: string;
    autoescape: true;
    throwOnUndefined: false;
    trimBlocks: false;
    lstripBlocks: false;
    cache: true;
}
export declare const defaultNunjunksOptions: INunjunksRenderOptions;
export declare const NUNJUNKS_OPTIONS: import("../../services/Configs").ConfigToken<INunjunksRenderOptions>;
