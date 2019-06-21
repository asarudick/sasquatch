import Report from '../reporting/Report';
import Reporter from '../reporting/Reporter';

export class Summary implements Reporter {
  constructor(private stream: Iterable<Report>, private options?) {}

  *report(): Iterable<any> {
    for (const report of this.stream) {
      if (!report) continue;
      yield {
        message: `${report.file} \t (${report.start}, ${report.end})\t ${
          report.message
        }`,
        report,
      };
    }
  }
}
