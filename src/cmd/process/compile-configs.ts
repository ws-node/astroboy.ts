import chalk from "chalk";
import { compileFn } from "../builders/config-compiler";

const {
  CONFIG_ROOT,
  OUTPUT_ROOT,
  FORCE,
  ENABLED,
  CHANGES,
  __TSCONFIG
} = process.env;

try {
  const changes: string[] = JSON.parse(CHANGES!);
  const results = compileFn({
    tsconfig: __TSCONFIG === "-" ? undefined : __TSCONFIG,
    configRoot: CONFIG_ROOT === "-" ? undefined : CONFIG_ROOT,
    outRoot: OUTPUT_ROOT === "-" ? undefined : OUTPUT_ROOT,
    enabled: String(ENABLED) === "true" ? true : false,
    force: String(FORCE) === "true" ? true : false,
    fileList: changes || []
  });
  results.forEach(each => {
    console.log(chalk.blueBright(each));
  });
  console.log(chalk.cyanBright(`\nCOUNT : [${results.length}]`));
  console.log("");
} catch (e) {
  throw e;
}
