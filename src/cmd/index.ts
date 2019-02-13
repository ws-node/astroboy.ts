import commander from "commander";
import { CommandPlugin } from "./base";
import { RouterPlugin } from "./router";
import { DevPlugin } from "./dev";

function initCommand(plugin: CommandPlugin) {
  const program = commander.name(plugin.name).description(plugin.description);
  if (plugin.options) {
    for (let i = 0; i < plugin.options.length; i++) {
      program.option(plugin.options[i][0], plugin.options[i][1]);
    }
  }
  program.action(plugin.action).on("--help", plugin.help);
}

[DevPlugin, RouterPlugin].forEach(i => initCommand(i));

commander.version("1.0.0-rc.1").parse(process.argv);

if (commander.args.length === 0) {
  commander.outputHelp();
}
