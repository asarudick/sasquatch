import * as fs from 'fs';
const bufferSize = 64;

function* readLine(file) {
  const buffer = Buffer.alloc(bufferSize, '');
  let remainder = '';

  while (true) {
    fs.readSync(file, buffer, 0, bufferSize, null);
    const str = buffer.toString();
    const bufferLines = str.split('\n');
    yield remainder + bufferLines.shift();
    remainder = bufferLines.pop();
    for (const line of bufferLines) {
      yield line;
    }
  }
}

export function readSection(path, start, end) {
  let currentLine = 1;
  const result = [];

  // Open file synchronously
  const file = fs.openSync(path, 'r');
  const lineReader = readLine(file);

  // Seek to start.
  while (currentLine < start) {
    lineReader.next();
    currentLine++;
  }

  // Read until end.
  while (currentLine <= end) {
    result.push(lineReader.next().value);
    currentLine++;
  }

  fs.closeSync(file);
  return result;
}
