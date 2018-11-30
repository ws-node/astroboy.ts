export * from "./decorators/injectable";
export * from "./decorators/controller";
export * from "./inject-server";
export * from "astroboy-router";
import { ControllerConstructor } from "astroboy-router/dist/metadata";
export declare function buildRouter<T>(ctor: ControllerConstructor<T>, name: string, root: string): (string | string[])[][];
