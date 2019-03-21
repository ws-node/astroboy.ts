/**
 * 基础configs预编译接口
 *
 * @author Big Mogician
 * @interface BaseCompiler
 * @template T
 */
export interface BaseCompiler<T> {
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

export interface ConfigDefines {
  modules?: {
    [name: string]: string;
  };
  functions?: {
    [name: string]: string;
  };
  consts?: {
    [name: string]: string;
  };
}

export interface InnerBaseCompiler<T> extends ConfigDefines {
  prototype: BaseCompiler<T> & { [prop: string]: any };
}
