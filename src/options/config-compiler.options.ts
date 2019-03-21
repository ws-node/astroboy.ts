import { createOptions } from "../services/Configs";

export interface InnerConfigCompilerOptions extends ConfigCompilerOptions {
  // TO DO
}

export interface ConfigCompilerOptions {
  /** 是否自动编译configs文件夹，默认：`false` */
  enabled: boolean;
  /** 是否强制编译configs文件夹，默认：`false` */
  force: boolean;
  /** 整个configs文件夹的相对位置，默认：`'config'` */
  configRoot?: string;
  /** 整个configs文件夹编译后的输出位置，默认：`'config'` */
  outRoot?: string;
}

export const defaultConfigCompilerOptions: ConfigCompilerOptions = {
  enabled: false,
  force: false,
  configRoot: "config",
  outRoot: "config"
};

export const CONFIG_COMPILER_OPTIONS = createOptions<ConfigCompilerOptions>(
  "CONFIG_COMPILER_OPTIONS"
);
