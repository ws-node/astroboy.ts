import commander from "commander";
import { options } from "./options";

function initCommand() {
  const program = commander
    .name(options.name)
    .description(options.description);
  if (options.options) {
    for (let i = 0; i < options.options.length; i++) {
      program.option(options.options[i][0], options.options[i][1]);
    }
  }
  program.action(options.action).on("--help", options.help);
  return program;
}

const program = initCommand()
  .version("1.0.0-rc.1")
  .parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
}
