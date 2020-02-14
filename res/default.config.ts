import { StandardModule, SasquatchConfig } from '../src/';
import { IndentationText, QuoteKind } from 'ts-morph';

export default {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  },
  analyzers: {
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
  out: {
    reporter: {
      summary: {
        maxLength: 25,
      },
    },
    printer: {
      base: {},
    },
  },
  modules: [StandardModule],
} as SasquatchConfig;
