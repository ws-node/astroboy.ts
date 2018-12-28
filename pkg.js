
const fs = require("fs");
const { exec } = require("child_process");
const package = require("./package.json");
const [_, __, rctokrn, rcadd] = process.argv;

const { version } = package;
const [main, oldrc] = (version || "").split("-");
let [___, rc] = oldrc.split(".");
rc = Number(rc) + Number(rcadd);
package.version = `${main}${!!rctokrn ? `-rc.${rc}` : ""}`
fs.writeFileSync("./package.json", JSON.stringify(package, null, "  "));

exec("npm publish", (error, stdout, stderr) => {
  if (error) {
    package.version = `${main}${!!rctokrn ? `-${oldrc}` : ""}`
    fs.writeFileSync("./package.json", JSON.stringify(package, null, "  "));
    throw error;
  } else {
    console.log(stdout);
    console.log(stderr);
  }
});
