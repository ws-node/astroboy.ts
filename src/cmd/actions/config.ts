import path from "path";
import chalk from "chalk";
import get from "lodash/get";
import { loadConfig } from "../utils/load-config";
import { exec } from "child_process";
import { CommandPlugin, ConfigCompilerConfig } from "../base";

export interface IConfigCmdOptions {
  force?: boolean;
  config?: string;
}

export const ConfigPlugin: CommandPlugin = {
  name: "config",
  description: "编译configs文件",
  options: [["-F, --force", "清除所有configs，并重新编译"]],
  help: () => {
    console.log("");
    console.log("  Examples:");
    console.log("");
    console.log("    $ atc config");
    console.log("    $ atc config --force");
    console.log();
  },
  action(_, command: IConfigCmdOptions) {
    if (_ !== "config") return;
    console.log(chalk.green("========= [ASTROBOY.TS] <==> CONFIGS ========\n"));
    const projectRoot = process.cwd();
    const fileName = command.config || "atc.config.js";
    console.log(
      `${chalk.white("🤨 - TRY LOAD FILE : ")}${chalk.yellow(fileName)}\n`
    );

    let config: ConfigCompilerConfig;
    const defaultConfigs: ConfigCompilerConfig = {
      enabled: true,
      configroot: undefined,
      outputroot: undefined,
      force: false,
      tsconfig: undefined
    };
    try {
      const req = loadConfig(projectRoot, fileName);
      config = {
        ...defaultConfigs,
        ...get(req, "configCompiler", {}),
        tsconfig: req.tsconfig || config.tsconfig
      };
    } catch (_) {
      config = defaultConfigs;
    }

    if (command.force) config.force = String(command.force) === "true";
    if (command.config) config.tsconfig = String(command.config);

    runConfigCompile(projectRoot, config);
  }
};

export function runConfigCompile(
  projectRoot: string,
  config: ConfigCompilerConfig,
  then?: (success: boolean, error?: Error) => void
) {
  try {
    const tsnode = require.resolve("ts-node");
    console.log("");
    console.log(chalk.cyan("⚙️ - COMPILE COMFIGS"));
    console.log("");
    const registerFile = path.resolve(__dirname, "../register");
    const initFile = path.resolve(__dirname, "../process/compile-configs");
    console.log(`script ==> ${chalk.grey(initFile)}`);
    console.log("");
    exec(
      `node -r ${registerFile} ${initFile}`,
      {
        env: {
          CONFIG_ROOT: config.configroot || "-",
          OUTPUT_ROOT: config.outputroot || "-",
          FORCE: String(config.force === true),
          ENABLED: String(config.enabled === true),
          __TSCONFIG: path.resolve(
            projectRoot,
            config.tsconfig || "tsconfig.json"
          )
        }
      },
      (error, stdout, stderr) => {
        if (error) {
          console.log(chalk.yellow("CONFIGS COMPILE FAILED"));
          if (then) {
            then(false, error);
            return;
          }
          console.log(chalk.red(<any>error));
          console.log("--------------------");
          return;
        }
        if (stderr) {
          console.log(chalk.yellow("CONFIGS COMPILE FAILED"));
          if (then) {
            then(false, error);
            return;
          }
          console.log(chalk.red(stderr));
          console.log("--------------------");
          return;
        }
        try {
          const count = showCounts(JSON.parse(stdout || "[]") || []);
          console.log(chalk.green(`COUNT : ${chalk.white(`[${count}]`)}\n`));
          // console.log(stdout);
          console.log(chalk.green(`CONFIGS COMPILE OVER`));
          if (then) then(true);
        } catch (_) {
          console.log(chalk.yellow("CONFIGS COMPILE FAILED"));
          if (then) {
            then(false, error);
            return;
          }
          console.log(chalk.red(_));
          console.log("--------------------");
        }
      }
    );
  } catch (e) {
    console.log(chalk.yellow("CONFIGS COMPILE FAILED"));
    if (((<Error>e).message || "").includes("ts-node")) {
      console.log(chalk.red("NEED TS-NODE"));
      return;
    }
    throw e;
  }
}

function showCounts(arr: any) {
  (arr || []).forEach(name => {
    console.log(chalk.blue(`---> ${name}`));
  });
  return (arr || []).length;
}
