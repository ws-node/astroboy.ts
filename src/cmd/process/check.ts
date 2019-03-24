import { CancellationToken } from "../utils/cancellation-token";
import { NormalizedMessage, Severity } from "../utils/normalized-msg";
import { loadProgramConfig, createProgram } from "../utils/type-check";
import * as typescript from "typescript";

const { TSCONFIG } = process.env;

async function run(cancellationToken: CancellationToken) {
  let diagnostics: any[] = [];
  const options = loadProgramConfig(TSCONFIG!, { noEmit: true });
  const program = createProgram(options);

  try {
    cancellationToken.throwIfCancellationRequested();
    diagnostics = await validation(program, cancellationToken);
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
      process.exit();
    }
  }
}

async function validation(
  program: typescript.Program,
  cancellationToken: CancellationToken
) {
  const diagnostics: any[] = [];
  const sourceFiles = program.getSourceFiles();
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
            file: i.file!.fileName,
            line: i.file!.getLineAndCharacterOfPosition(i.start || 0).line + 1,
            character:
              i.file!.getLineAndCharacterOfPosition(i.start || 0).character + 1
          })
      )
    );
  });
  return Promise.resolve(diagnostics);
}

process.on("message", message => {
  run(CancellationToken.createFromJSON(typescript, message));
});

process.on("SIGINT", () => {
  process.exit();
});
