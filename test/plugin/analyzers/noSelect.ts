import * as path from 'path';
import AnalysisReport from '../../../src/reporting/AnalysisReport';
import { SyntaxKind, SourceFile } from 'ts-morph';
import { Analyzer } from '../../../src/types';

export const NoSelect: Analyzer = function*(
  sources: SourceFile[],
  options: any,
) {
  for (let source of sources) {
    // Collect all functions in source.
    const scopedFunctions = source.getFunctions();
    const classes = source.getClasses();
    const constructors = classes.reduce(
      (memo, c) => [...memo, ...c.getConstructors()],
      [],
    );
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
      ...constructors,
      ...instanceMethods,
      ...staticMethods,
    ];

    for (let f of functions) {
      const calls = f.getDescendantsOfKind(SyntaxKind.CallExpression);
      for (let call of calls) {
        if (call.getName() === 'select') {
          yield new AnalysisReport(
            `Inappropriate use of .select(). Consider using something else.`,
            path.relative(process.cwd(), f._sourceFile._compilerNode.fileName),
            f.getStartLineNumber(),
            f.getEndLineNumber(),
          );
        }
      }
    }
  }
};
