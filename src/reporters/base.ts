import { readSection } from '../reporting/readSection';
import Report from '../reporting/Report';
import Reporter from '../reporting/Reporter';

export class Base implements Reporter {
  constructor(private stream: Iterable<Report>, private options) {}

  *report(): Iterable<any> {
    for (const report of this.stream) {
      if (!report) continue;
      yield {
        message: `
Code Smell: ${report.message}
File: ${report.file}
Lines: ${report.start} - ${report.end}
------------------------------
${readSection(
          report.file,
          report.start - 2,
          Math.min(report.end + 2, report.start - 2 + this.options.maxLength),
        ).join('\n')}
`,
        report,
      };
    }
  }
}
