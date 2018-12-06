/**
 * ## 配置JsonResult的解析方式
 * @description
 * @author Big Mogician
 * @export
 * @interface JsonResultOptions
 */
export interface JsonResultOptions {
    /** 是否进行格式化 - 默认：`false` */
    format: boolean;
    /** 格式化空格数量 - 默认：`2` */
    whiteSpace: 0 | 1 | 2 | 4;
    /** 对象键值处理函数 - 默认：`undefined` */
    keyResolver?: (key: string) => string;
}
export declare const defaultJsonResultOptions: JsonResultOptions;
export declare const JSON_RESULT_OPTIONS: import("@bonbons/di/dist/src/core/declares").IToken<JsonResultOptions>;
