export * from "./decorators/injectable";
export * from "./decorators/controller";
export * from "./middlewares";
export * from "./services/Context";
export * from "./services/Injector";
export * from "./services/Configs";
export * from "./services/BaseClass";
export * from "./services/AstroboyContext";
export * from "./server";
export * from "./configs";
export * from "astroboy-router";
import { ControllerConstructor } from "astroboy-router/dist/metadata";
import { createRouter } from "astroboy-router";
import { GlobalImplements } from "./utils";

export function buildRouter<T>(ctor: ControllerConstructor<T>, name: string, root: string) {
  return createRouter(GlobalImplements.get(ctor), name, root);
}
