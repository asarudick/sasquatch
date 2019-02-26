import { IndentationText, QuoteKind } from 'ts-morph';

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
      'ReplaceNgInjectWith$inject',
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
      ArgumentCount: {
        max: 3,
      },
      LongFile: {
        max: 200,
      },
      MethodCount: {
        max: 3,
      },
      ReturnCount: {
        max: 3,
      },
      ComplexLogic: {
        max: 4,
      },
    },
  },
};
