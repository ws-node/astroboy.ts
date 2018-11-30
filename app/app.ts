import path from "path";
import Astroboy from "astroboy";
import { Server } from "../src";

Server.Create(Astroboy, {
  ROOT_PATH: path.resolve(__dirname, "..")
}).run(() => {
  console.log("hello world!");
});
