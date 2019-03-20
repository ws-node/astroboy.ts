import { preConfigCompiler } from "../index";

const { CONFIG_ROOT, OUTPUT_ROOT, FORCE, ENABLED } = process.env;

// @ts-ignore
try {
  preConfigCompiler({
    configRoot: CONFIG_ROOT === "-" ? undefined : CONFIG_ROOT,
    outRoot: OUTPUT_ROOT === "-" ? undefined : OUTPUT_ROOT,
    enabled: String(ENABLED) === "true" ? true : false,
    force: String(FORCE) === "true" ? true : false
  });
} catch (e) {
  console.log(e);
}
