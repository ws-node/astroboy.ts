import { CancellationToken } from "../utils/CancellationToken";
import { NormalizedMessage, Severity } from "../utils/NormalizedMessage";
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
      diagnostics.push(
        ...register.map(
          i =>
            new NormalizedMessage({
              type: NormalizedMessage.TYPE_DIAGNOSTIC,
              code: i.code,
              severity: typescript.DiagnosticCategory[
                i.category
              ].toLowerCase() as Severity,
              content: typescript.flattenDiagnosticMessageText(
                i.messageText,
                "\n"
              ),
              file: i.file.fileName,
              line: i.file.getLineAndCharacterOfPosition(i.start).line + 1,
              character: i.file.getLineAndCharacterOfPosition(i.start).character
            })
        )
      );
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
        diagnostics
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
