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
    reporting: {
      maxLength: 25,
    },
    use: {
      LongFunction: {
        maxLength: 25,
      },
    },
  },
};
