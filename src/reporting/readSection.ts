import * as fs from 'fs';
const bufferSize = 64;

export function readSection(path, start, end) {
  const buffer = Buffer.alloc(bufferSize, '');
  let currentLine = 1;
  const lines = [];

  // Open file synchronously
  const file = fs.openSync(path, 'r');

  while (currentLine <= end) {
    fs.readSync(file, buffer, 0, bufferSize, null);
    const str = buffer.toString();
    const bufferLines = str.split('\n');

    // Append end of last string segment.
    if (lines.length) {
      lines[lines.length - 1] += bufferLines.shift();
      // Previous segment turned into a line.
      currentLine++;
    }

    for (const line of bufferLines) {
      if (currentLine >= start && currentLine <= end) {
        lines.push(line);
      }
      // Eager increment. Last segment will get a decrement to nullify its
      // increment.
      currentLine++;
    }
    // Last segment may not be a line.
    currentLine--;
  }
  fs.closeSync(file);
  return lines;
}
