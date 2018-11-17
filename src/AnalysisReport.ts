import * as lazy from 'lazy';
import * as fs from 'fs';

function readLines(file, start, end) {
  const stream = fs.createReadStream(file);
  const lines = [];
  const lazylines = lazy(stream)
    .lines.skip(Math.min(start - 1, 0))
    .take(end - start + 1)
    .map(line => line.toString('utf-8'))
    .forEach(line => lines.push(line));
  return lines;
}

export default class AnalysisReport {
  constructor(
    private message: string,
    private file: string,
    private start: number,
    private end: number,
  ) {}

  get report() {
    return `
      ${this.message}
      ------------------------------
      ${readLines(this.file, this.start - 2, this.end + 2).join('\n')}
    `;
  }
}
