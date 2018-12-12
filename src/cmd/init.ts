import { preInitFn } from "../index";

const {
  CTOR_PATH,
  ROUTER_PATH,
  ASTT_ENABLED,
  ASTT_ALWAYS,
  APP_ROOT,
  FILE_TYPE
} = process.env;

// @ts-ignore
preInitFn({
  enabled: ASTT_ENABLED === "true",
  always: ASTT_ALWAYS === "true",
  fileType: <any>FILE_TYPE,
  appRoot: APP_ROOT,
  // @ts-ignore
  ctorFolder: CTOR_PATH,
  routerFolder: ROUTER_PATH
}, ({ routers, error }) => {
  if (error) {
    throw error;
  } else {
    console.log(routers);
  }
});
