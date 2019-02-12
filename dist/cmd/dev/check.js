"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CancellationToken_1 = require("../utils/CancellationToken");
const typeCheck_1 = require("../typeCheck");
const typescript = tslib_1.__importStar(require("typescript"));
const { TSCONFIG } = process.env;
function run(cancellationToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const diagnostics = [];
        //   let lints: any[] = [];
        //   checker.nextIteration();
        const options = typeCheck_1.loadProgramConfig(TSCONFIG, { noEmit: true });
        const program = typeCheck_1.createProgram(options);
        const sourceFiles = program.getSourceFiles();
        try {
            cancellationToken.throwIfCancellationRequested();
            sourceFiles.forEach(sourceFile => {
                const register = program
                    .getSemanticDiagnostics(sourceFile, cancellationToken)
                    .concat(program.getSyntacticDiagnostics(sourceFile, cancellationToken));
                diagnostics.push(...register);
            });
        }
        catch (error) {
            if (error instanceof typescript.OperationCanceledException) {
                return;
            }
            throw error;
        }
        if (!cancellationToken.isCancellationRequested()) {
            try {
                process.send({
                    diagnostics: []
                });
            }
            catch (e) {
                // channel closed...
                process.exit();
            }
        }
    });
}
process.on("message", message => {
    run(CancellationToken_1.CancellationToken.createFromJSON(typescript, message));
});
process.on("SIGINT", () => {
    process.exit();
});
//# sourceMappingURL=check.js.map