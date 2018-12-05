import path from "path";
import Astroboy from "astroboy";
import { Server, JSON_RESULT_OPTIONS, JsonResolvers } from "../src";
import { DEMO_OPTIONS } from "../config/options/demo";
import { STR_OPT } from "../config/options/strOpt";

// new Astroboy({
//   ROOT_PATH: path.resolve(__dirname, "..")
// }).on("start", () => {
//   console.log("hello world!");
// }).on("error", (err) => {
//   console.log(`fuck it : ${String(err)}`);
// });

Server.Create(Astroboy, {
  ROOT_PATH: path.resolve(__dirname, "..")
})
  .option(STR_OPT)
  .option(DEMO_OPTIONS)
  .option(JSON_RESULT_OPTIONS, { format: true, keyResolver: JsonResolvers.camelcase })
  .run({
    onStart: () => console.log("hello world!"),
    onError: (err) => console.log(`fuck it : ${String(err)}`)
  });
