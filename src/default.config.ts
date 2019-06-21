import { StandardModule } from './modules';
import { IndentationText, QuoteKind } from 'ts-morph';
import { SasquatchConfig } from './types';

export default {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
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
