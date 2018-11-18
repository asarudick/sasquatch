import { readSection } from './readSection';
import Report from './Report';

export default class Reporter {
  constructor(private reports: Report[], private options) {}
  report(out: Function) {
    for (const report of this.reports) {
      out(`
${report.message}
Lines: ${report.start} - ${report.end}
------------------------------
${readSection(
        report.file,
        report.start - 2,
        Math.min(report.end + 2, this.options.maxLength),
      ).join('\n')}
`);
    }
  }
}
