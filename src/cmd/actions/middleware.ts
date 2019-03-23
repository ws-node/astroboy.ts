import path from "path";
import chalk from "chalk";
import get from "lodash/get";
import { loadConfig } from "../utils/load-config";
import { MiddlewareCompilerConfig } from "../base";
import { exec } from "child_process";
import { CommandPlugin } from "../base";

export interface IMiddlewareCmdOptions {
  force?: boolean;
  config?: string;
}

export const MiddlewarePlugin: CommandPlugin = {
  name: "middleware",
  description: "编译middlewares文件",
  options: [["-F, --force", "清除所有middlewares，并重新编译"]],
  help: () => {
    console.log("");
    console.log("  Examples:");
    console.log("");
    console.log("    $ atc middleware");
    console.log("    $ atc middleware --force");
    console.log();
  },
  action(_, command: IMiddlewareCmdOptions) {
    if (_ !== "middleware") return;
    console.log(
      chalk.green("========= [ASTROBOY.TS] <==> MIDDLEWARES ========\n")
    );
    const projectRoot = process.cwd();
    const fileName = command.config || "atc.config.js";
    console.log(
      `${chalk.white("🤨 - TRY LOAD FILE : ")}${chalk.yellow(fileName)}`
    );

    let config: MiddlewareCompilerConfig;
    const defaultConfigs: MiddlewareCompilerConfig = {
      enabled: true,
      root: undefined,
      output: undefined,
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

    runMiddlewareCompile(projectRoot, config);
  }
};

export function runMiddlewareCompile(
  projectRoot: string,
  config: MiddlewareCompilerConfig,
  then?: (success: boolean, error?: Error) => void
) {
  try {
    const tsnode = require.resolve("ts-node");
    console.log("");
    console.log(chalk.cyan("🚄 - CONPILE MIDDLEWARES"));
    console.log("");
    const registerFile = path.resolve(__dirname, "../register");
    const initFile = path.resolve(__dirname, "../process/middleware-run");
    console.log(`script ==> ${chalk.grey(initFile)}`);
    console.log("");
    exec(
      `node -r ${registerFile} ${initFile}`,
      {
        env: {
          FOLDER_ROOT: config.root || "-",
          OUTPUT_ROOT: config.output || "-",
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
          console.log(chalk.yellow("COMPILE MIDDLEWARES FAILED"));
          if (then) {
            then(false, error);
            return;
          }
          console.log(chalk.red(<any>error));
          console.log("--------------------");
          return;
        }
        if (stderr) {
          console.log(chalk.yellow("COMPILE MIDDLEWARES FAILED"));
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
          console.log(chalk.green(`COMPILE MIDDLEWARES OVER`));
          if (then) then(true);
        } catch (_) {
          console.log(chalk.yellow("COMPILE MIDDLEWARES FAILED"));
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
    console.log(chalk.yellow("COMPILE MIDDLEWARES FAILED"));
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
