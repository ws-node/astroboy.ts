import { CancellationToken } from "../utils/CancellationToken";
import { loadProgramConfig, createProgram } from "../typeCheck";
import * as typescript from "typescript";

const { TSCONFIG } = process.env;

async function run(cancellationToken: CancellationToken) {
  const diagnostics: any[] = [];
  //   let lints: any[] = [];

  //   checker.nextIteration();
  const options = loadProgramConfig(TSCONFIG, { noEmit: true });
  const program = createProgram(options);
  const sourceFiles = program.getSourceFiles();

  try {
    cancellationToken.throwIfCancellationRequested();
    sourceFiles.forEach(sourceFile => {
      const register = program
        .getSemanticDiagnostics(sourceFile, cancellationToken)
        .concat(program.getSyntacticDiagnostics(sourceFile, cancellationToken));
      diagnostics.push(...register);
    });
  } catch (error) {
    if (error instanceof typescript.OperationCanceledException) {
      return;
    }
    throw error;
  }

  if (!cancellationToken.isCancellationRequested()) {
    try {
      process.send!({
        diagnostics: []
      });
    } catch (e) {
      // channel closed...
      process.exit();
    }
  }
}

process.on("message", message => {
  run(CancellationToken.createFromJSON(typescript, message));
});

process.on("SIGINT", () => {
  process.exit();
});
