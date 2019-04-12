import { IStaticTypedResolver } from "../typings/IStaticTypeResolver";
import { createOptions } from "../typings/IConfigs";

export const STATIC_RESOLVER = createOptions<IStaticTypedResolver>(
  "STATIC_RESOLVER"
);
