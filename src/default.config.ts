import { IndentationText, QuoteKind } from 'ts-simple-ast';

export default {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  },
  transforms: {
    use: [
      // 'AddBuiltInAngularTypes',
      // 'AddBuiltInAngularTypesNgInject',
      // 'ReplaceNgInjectWith$inject',
    ],
  },
  analyzers: {
    use: {
      LongFunction: {
        maxLength: 25,
      },
    },
  },
};
