import AnalysisReport from '../reporting/AnalysisReport';
import * as path from 'path';

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
    const functions = [
      ...scopedFunctions,
      ...constructors,
      ...instanceMethods,
      ...staticMethods,
    ];

    // Filter out functions shorter than threshold.
    const excessiveParams = functions.filter(f => {
      return f.getParameters().length > options.max;
    });

    // Yield a new report for each long function.
    for (let f of excessiveParams) {
      yield new AnalysisReport(
        `Excessive Parameters (${f.getParameters().length} parameters exceeds ${
          options.max
        } parameter maximum)`,
        path.relative(process.cwd(), f._sourceFile._compilerNode.fileName),
        f.getStartLineNumber(),
        f.getEndLineNumber(),
      );
    }
  }
}
