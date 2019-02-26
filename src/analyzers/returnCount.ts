import { SyntaxKind } from 'ts-simple-ast';
import * as path from 'path';
import AnalysisReport from '../reporting/AnalysisReport';

export default function*(sources, options) {
  for (let source of sources) {
    // Collect all functions in source.
    const scopedFunctions = source.getFunctions();
    const classes = source.getClasses();
    const instanceMethods = classes.reduce(
      (memo, c) => [...memo, ...c.getInstanceMethods()],
      [],
    );
    const staticMethods = classes.reduce(
      (memo, c) => [...memo, ...c.getStaticMethods()],
      [],
    );

    // Group together.
    const functions = [
      ...scopedFunctions,
      ...instanceMethods,
      ...staticMethods,
    ];

    // Filter out functions shorter than threshold.
    const excessiveReturns = functions.filter(f => {
      const body = f.getBody();
      return (
        body
          .getStatements()
          .filter(s => s.getKind() === SyntaxKind.ReturnStatement).length >
        options.max
      );
    });

    // Yield a new report for each function with too many arguments.
    for (let f of excessiveReturns) {
      const body = f.getBody();
      const count = body
        .getStatements()
        .filter(s => s.getKind() === SyntaxKind.ReturnStatement).length;
      yield new AnalysisReport(
        `Return Count (${count} return statements exceeds ${
          options.max
        } arguments maximum)`,
        path.relative(process.cwd(), f._sourceFile._compilerNode.fileName),
        f.getStartLineNumber(),
        f.getEndLineNumber(),
      );
    }
  }
}
