import { AstroboyContext } from "./AstroboyContext";
import { Injectable } from "../decorators/injectable";

/**
 * 基础configs预编译接口
 *
 * @author Big Mogician
 * @interface BaseCompiler
 * @template T
 */
interface BaseCompiler<T> {
  /**
   * 编译输出过程，可以是import语句，模块变量声明，函数等执行过程语句
   *
   * @author Big Mogician
   * @param {NodeJS.Process} process
   * @returns {string[]}
   * @memberof BaseCompiler
   */
  procedures?(process: NodeJS.Process): string[];
}

/**
 * 严格configs预编译接口
 * * 需要实现完整的configs接口
 * * 适合config.default.ts使用
 *
 * @author Big Mogician
 * @export
 * @interface IStrictConfigsCompiler
 * @extends {BaseCompiler<T>}
 * @template T
 */
export interface IStrictConfigsCompiler<T> extends BaseCompiler<T> {
  configs(process: NodeJS.Process): T;
}

/**
 * 松散configs预编译接口
 * * 需要实现部分的configs接口
 * * 适合非config.default.ts的文件使用
 *
 * @author Big Mogician
 * @export
 * @interface IConfigsCompiler
 * @extends {BaseCompiler<T>}
 * @template T
 */
export interface IConfigsCompiler<T> extends BaseCompiler<T> {
  configs(process: NodeJS.Process): Partial<T>;
}

/**
 * ## 基础ConfigReader
 * * 为configs提供智能感知
 * * 实现上只是一个`ctx.getConfig(...)`的代理
 * * 继承此类以实现自定义DI
 *
 * @template T typeof configs
 */
@Injectable()
export class ConfigReader<T extends { [prop: string]: any } = {}> {
  /**
   * ### 使用语法表达式来填充
   * * 使用简单语句
   * * 避免使用复杂字符串
   * * 繁重的逻辑可以使用`procedures`
   *
   * @author Big Mogician
   * @static
   * @template T
   * @param {string} expression
   * @returns {T}
   * @memberof ConfigReader
   */
  static Expression<T = any>(expression: string): T {
    return Symbol(expression) as any;
  }

  /**
   * 整个config数据
   *
   * @readonly
   * @type {T}
   * @memberof ConfigReader
   */
  public get global(): T {
    return this.read();
  }

  constructor(private __context: AstroboyContext) {}

  /**
   * 读取config的某一个key下的数据
   *
   * @author Big Mogician
   * @template K
   * @param {K} key
   * @returns {T[K]}
   * @memberof ConfigReader
   */
  public read<K extends keyof T>(key: K): T[K];
  /**
   * 读取整个config
   *
   * @author Big Mogician
   * @returns {T}
   * @memberof ConfigReader
   */
  public read(): T;
  public read(key?: string): any {
    return this.__context.ctx.getConfig(key);
  }
}
