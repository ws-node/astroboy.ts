import { preInitFn } from "../cmd";
import chalk from "chalk";

const {
  CTOR_PATH,
  ROUTER_PATH,
  ASTT_ENABLED,
  ASTT_ALWAYS,
  APP_ROOT,
  FILE_TYPE,
  SHOW_ROUTERS
} = process.env;

// @ts-ignore
preInitFn(
  {
    enabled: ASTT_ENABLED === "true",
    always: ASTT_ALWAYS === "true",
    fileType: <any>FILE_TYPE,
    appRoot: APP_ROOT,
    ctorFolder: CTOR_PATH,
    routerFolder: ROUTER_PATH
  },
  ({ routers, error }) => {
    if (error) {
      throw error;
    } else {
      if (SHOW_ROUTERS === "true") {
        routers.forEach(each => {
          console.log(chalk.blueBright(each));
        });
        console.log(chalk.cyanBright(`\nCOUNT : [${routers.length}]`));
        console.log("");
      }
    }
  }
);
