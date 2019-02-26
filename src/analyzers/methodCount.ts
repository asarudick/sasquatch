import AnalysisReport from '../reporting/AnalysisReport';
import * as path from 'path';

export default function*(sources, options) {
  for (let source of sources) {
    // Collect all functions in source.
    const classes = source.getClasses();
    const excessiveMethods = classes.filter(
      c =>
        c.getInstanceMethods().length + c.getStaticMethods().length >
        options.max,
    );

    // Yield a new report for each class with excessive methods.
    for (let c of excessiveMethods) {
      yield new AnalysisReport(
        `Method Count (${c.getInstanceMethods().length +
          c.getStaticMethods().length} methods exceeds ${
          options.max
        } method maximum)`,
        path.relative(process.cwd(), c._sourceFile._compilerNode.fileName),
        c.getStartLineNumber(),
        c.getEndLineNumber(),
      );
    }
  }
}
