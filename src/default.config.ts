import { StandardModule } from './modules';
import { IndentationText, QuoteKind } from 'ts-morph';

export default {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  },
  modules: [StandardModule],
};
