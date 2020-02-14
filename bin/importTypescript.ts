import ts from 'typescript';
import fs from 'fs';
import requireFromString from 'require-from-string';
import path from 'path';

// There's no alternative way to import a typescript file in what will be JS (after building).
export function importTypescript(src) {
  const contents = fs.readFileSync(src);
  let result = ts.transpileModule(contents.toString(), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  return requireFromString(result, src, { prependPaths: [path.dirname(src)] });
}
