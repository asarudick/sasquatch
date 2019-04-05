import { SyntaxKind } from 'ts-morph';
import flatten from 'lodash/flatten';
import isFunction from 'lodash/isFunction';
import * as path from 'path';
import AnalysisReport from '../reporting/AnalysisReport';

export default function*(sources, options) {
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
    const functions: any[] = [
      ...constructors,
      ...scopedFunctions,
      ...instanceMethods,
      ...staticMethods,
    ];

    // Filter out functions shorter than threshold.
    const complexLogic: any[] = functions.map(f => {
      const statements = f.getBody().getStatements();
      return statements
        .filter(
          s =>
            s &&
            isFunction(s.getExpression) &&
            s.getExpression() &&
            s.getExpression().getKind() === SyntaxKind.BinaryExpression,
        )
        .map(s => {
          let count = 0;
          let expression =
            s.getExpression && isFunction(s.getExpression) && s.getExpression();
          if (!expression) return;
          while (expression.getKind() === SyntaxKind.BinaryExpression) {
            count++;
            if (count > options.max) return { statement: s, count };
            expression = expression.getLeft();
          }
          return;
        })
        .filter(s => s);
    });

    // Yield a new report for each function with too many arguments.
    for (let s of flatten(complexLogic).filter(i => i)) {
      yield new AnalysisReport(
        `Complex Logic (${s.count} logical operators exceeds ${
          options.max
        } logical operators in an expression max)`,
        path.relative(
          process.cwd(),
          s.statement._sourceFile._compilerNode.fileName,
        ),
        s.statement.getStartLineNumber(),
        s.statement.getEndLineNumber(),
      );
    }
  }
}
