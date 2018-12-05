import { createOptions } from "../services/Configs";

export interface RouterOptions {
  apiPrefix: string;
}

export const defaultRouterOptions: RouterOptions = {
  apiPrefix: "api"
};

export const ROUTER_OPTIONS = createOptions<RouterOptions>("ROUTER_OPTIONS");
