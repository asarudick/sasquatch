import AnalysisReport from '../reporting/AnalysisReport';
import * as path from 'path';

export default function*(sources, options) {
  for (let source of sources) {
    const text = source.getFullText();
    const length = text.split('\n').length;
    // Yield a new report for each long function.
    if (length > options.max) {
      yield new AnalysisReport(
        `File Length (${length} lines exceeds ${
          options.max
        } file length maximum)`,
        path.relative(process.cwd(), source._compilerNode.fileName),
        0,
        length,
      );
    }
  }
}
