import { middlewareCompileFn } from "../builders/middleware-cmp";

const { FOLDER_ROOT, OUTPUT_ROOT, FORCE, ENABLED, __TSCONFIG } = process.env;

// @ts-ignore
try {
  const results = middlewareCompileFn({
    tsconfig: __TSCONFIG === "-" ? undefined : __TSCONFIG,
    rootFolder: FOLDER_ROOT === "-" ? undefined : FOLDER_ROOT,
    outFolder: OUTPUT_ROOT === "-" ? undefined : OUTPUT_ROOT,
    enabled: String(ENABLED) === "true" ? true : false,
    force: String(FORCE) === "true" ? true : false
  });
  console.log(JSON.stringify(results));
} catch (e) {
  throw e;
}
