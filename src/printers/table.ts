export class Table {
  reports = [];
  add(report) {
    this.reports.push({
      file: report.report.file,
      smell: report.report.message,
      line: report.report.start,
    });
  }
  flush() {
    console.table(this.reports, ['file', 'smell', 'line']);
  }
}
