import { IndentationText, QuoteKind } from 'ts-morph';
import { StandardModule, AngularJsModule } from './modules';

export default {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  },
  modules: [StandardModule, AngularJsModule],
};
