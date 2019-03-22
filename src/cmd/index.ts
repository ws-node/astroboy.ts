import commander from "commander";
import { CommandPlugin } from "./base";
import { DevPlugin } from "./actions/dev";
import { RouterPlugin } from "./actions/routers";
import { ConfigPlugin } from "./actions/config";
import { MiddlewarePlugin } from "./actions/middleware";

function initCommand(plugin: CommandPlugin) {
  const program = commander.name(plugin.name).description(plugin.description);
  if (plugin.options) {
    for (let i = 0; i < plugin.options.length; i++) {
      program.option(plugin.options[i][0], plugin.options[i][1]);
    }
  }
  program.action(plugin.action).on("--help", plugin.help);
}

[DevPlugin, RouterPlugin, ConfigPlugin, MiddlewarePlugin].forEach(i =>
  initCommand(i)
);

commander.version("1.0.0-rc.1").parse(process.argv);

if (commander.args.length === 0) {
  commander.outputHelp();
}
