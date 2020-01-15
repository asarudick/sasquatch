import ts from 'typescript';
import fs from 'fs';
import requireFromString from 'require-from-string';

// There's no alternative way to import a typescript file in what will be JS (after building).
export function importTypescript(path) {
  const contents = fs.readFileSync(path);
  let result = ts.transpileModule(contents.toString(), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  return requireFromString(result);
}
