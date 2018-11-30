export * from "./decorators/injectable";
export * from "./decorators/controller";
export * from "./inject-server";
export * from "astroboy-router";
import { ControllerConstructor } from "astroboy-router/dist/metadata";
import { createRouter } from "astroboy-router";
import { GlobalImplements } from "./inject-server";

export function buildRouter<T>(ctor: ControllerConstructor<T>, name: string, root: string) {
  return createRouter(GlobalImplements.get(ctor), name, root);
}
