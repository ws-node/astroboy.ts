import commander from "commander";
import chalk from "chalk";
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
}

initCommand();

commander
  .version("1.0.0-rc.1");

commander
  .command("*")
  .action((commandName) => {
    console.log(arguments);
    console.log(chalk.red(`cmd [${commandName}] is not exist.`));
  });

commander
  .parse(process.argv);

if (commander.args.length === 0) {
  commander.outputHelp();
}
