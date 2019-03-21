import { PartReset, ChangeReturn } from "./utils";
import { Server } from "./server";
import { DIContainer, Constructor } from "@bonbons/di";

type ServerBundle = PartReset<Server, { run: any }>;
type InnerBundle = ServerBundle & {
  "@global": DIContainer<any>;
  "@options": [any, any?][];
  "@singletons": [Constructor<any>, any?][];
  "@scopeds": [Constructor<any>, any?][];
  "@uniques": [Constructor<any>, any?][];
};
/**
 * ## DI Bundles
 * * 导入并移动使用DI容器的注册api
 * * 和普通注入项解析方式相同
 */
export const Bundles: ChangeReturn<ServerBundle, ServerBundle> = {
  option(...args: any[]): ServerBundle {
    Bundles["@options"].push(args);
    return Bundles as any;
  },
  scoped(...args: any[]): ServerBundle {
    Bundles["@scopeds"].push(args);
    return Bundles as any;
  },
  singleton(...args: any[]): ServerBundle {
    Bundles["@singletons"].push(args);
    return Bundles as any;
  },
  unique(...args: any[]): ServerBundle {
    Bundles["@uniques"].push(args);
    return Bundles as any;
  },
  "@options": [],
  "@singletons": [],
  "@scopeds": [],
  "@uniques": []
} as any;
export const InnerBundle: InnerBundle = Bundles as any;
