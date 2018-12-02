import { createMiddleware, Context } from "../../src";

export = () => createMiddleware(async ({ injector, configs, ctx, next }) => {
  // console.log(injector);
  // console.log(configs);
  await next();
  // console.log("fuck");
});