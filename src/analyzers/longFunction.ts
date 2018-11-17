import AnalysisReport from '../AnalysisReport';
import * as path from 'path';

export default (sources, options) => {
  return sources.map(source => {
    const scopedFunctions = source.getFunctions();
    const classes = source.getClasses();
    const constructors = classes.reduce(
      (memo, c) => memo.concat(c.getConstructors()),
      [],
    );
    const instanceMethods = classes.reduce(
      (memo, c) => memo.concat(c.getInstanceMethods()),
      [],
    );
    const staticMethods = classes.reduce(
      (memo, c) => memo.concat(c.getStaticMethods()),
      [],
    );

    const functions = [
      ...scopedFunctions,
      ...constructors,
      ...instanceMethods,
      ...staticMethods,
    ];

    const longFunctions = functions.filter(f => {
      const length = f.getEndLineNumber() - f.getStartLineNumber();
      console.log(length);
      return length > options.maxLength;
    });

    return longFunctions.map(
      f =>
        new AnalysisReport(
          `Long Function: ${f.getEndLineNumber() -
            f.getStartLineNumber()} lines.`,
          path.relative(process.cwd(), f.sourceFile.compilerNode.fileName),
          f.getStartLineNumber(),
          f.getEndLineNumber(),
        ),
    );
  });
};
