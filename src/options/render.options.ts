import { Constructor } from "@bonbons/di";
import { createOptions } from "../services/Configs";
import { NunjunksEngine } from "../plugins/nunjunks";
import { IViewEngine } from "../typings/IViewEngine";

/**
 * ## 模板渲染错误处理接口
 * @description
 * @author Big Mogician
 * @interface IErrorHandler
 */
interface IErrorHandler {
  /** 错误页面模板的path，默认：`undefined` */
  path: string;
  /** 错误页面字符串模板，默认：`undefined` */
  tplStr: string;
  /**
   * 错误页面渲染函数，作为兜底的渲染能力提供，
   * * 默认(dev)：`() => "${错误的堆栈信息}""`
   * * 默认(prod)：`() => "Internal Server Error"`
   * * 通常不要复写此字段，除非`path`或`tplStr`能够提供可用的内容
   */
  content: (error: Error) => string;
}

/**
 * ## 配置RenderResult的解析方式
 * @description
 * @author Big Mogician
 * @export
 * @interface RenderResultOptions
 */
export interface RenderResultOptions<T extends string | Symbol = any> {
  /** astroboy原生渲染的参数配置 */
  astConf: {
    /** 使用原生的渲染逻辑，默认：`false` */
    use: boolean;
    /** 原生astroboy渲染时的`config`字段，默认：`undefined` */
    configs: any;
    /** 原生astroboy渲染时的`state`字段，默认：`undefined` */
    state: any;
  };
  /** 模板根路径，如果提供，path将会拼装成绝对路径下到对应的渲染引擎。默认：`undefined` */
  root: string;
  /** 模板文件相对路径，默认：`""` */
  path: string;
  /** 模板字符串，如果提供将优先使用此渲染，默认：`undefined` */
  tplStr: string;
  /** 配置信息，将作为渲染引擎需要接受的configs字段下传，默认：`undefined` */
  configs: any;
  /** 默认的模板引擎，默认：`"nunjunks"` */
  engine: T;
  /** 模板引擎DI列表，可以动态merge合并配置，默认：`{ nunjunks: NunjunksEngine }` */
  engines: {
    [prop: string]: Constructor<IViewEngine>;
  };
  /** 当渲染错误(生产模式)需要走的执行逻辑 */
  onError: Partial<IErrorHandler>;
  /** 当渲染错误(开发模式)需要走的执行逻辑 */
  onDevError: Partial<IErrorHandler>;
}

export const defaultRenderResultOptions: RenderResultOptions<"nunjunks"> = {
  astConf: {
    use: false,
    configs: undefined,
    state: undefined
  },
  path: "",
  tplStr: undefined,
  root: undefined,
  configs: undefined,
  engine: "nunjunks",
  engines: {
    nunjunks: NunjunksEngine
  },
  onError: {
    path: undefined,
    tplStr: undefined,
    content: (_) => "Internal Server Error"
  },
  onDevError: {
    path: undefined,
    tplStr: undefined,
    content: (e) => `<h3 style="color: red">${(e.name && `模板渲染错误: ${e.name}`) || "模板渲染错误"}<h3><pre>${e.stack}</pre>`
  }
};

/** RenderResult配置token */
export const RENDER_RESULT_OPTIONS = createOptions<RenderResultOptions>("RENDER_RESULT_OPTIONS");
