import { preConfigCompiler } from "../cmd";

const { CONFIG_ROOT, OUTPUT_ROOT, FORCE, ENABLED, __TSCONFIG } = process.env;

try {
  const results = preConfigCompiler({
    tsconfig: __TSCONFIG === "-" ? undefined : __TSCONFIG,
    configRoot: CONFIG_ROOT === "-" ? undefined : CONFIG_ROOT,
    outRoot: OUTPUT_ROOT === "-" ? undefined : OUTPUT_ROOT,
    enabled: String(ENABLED) === "true" ? true : false,
    force: String(FORCE) === "true" ? true : false
  });
  console.log(JSON.stringify(results));
} catch (e) {
  throw e;
}
