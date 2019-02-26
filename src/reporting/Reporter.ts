import { readSection } from './readSection';
import Report from './Report';

export default class Reporter {
  constructor(private stream: Iterable<Report>, private options) {}

  *report(): Iterable<string> {
    for (const report of this.stream) {
      if (!report) continue;
      yield `
Code Smell: ${report.message}
File: ${report.file}
Lines: ${report.start} - ${report.end}
------------------------------
${readSection(
        report.file,
        report.start - 2,
        Math.min(report.end + 2, this.options.maxLength),
      ).join('\n')}
`;
    }
  }
}
