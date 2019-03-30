import { IndentationText, QuoteKind } from 'ts-morph';
import { StandardModule } from './modules';
import { AngularJsModule } from 'sasquatch-angularjs';
// console.log(AngularJsModule);
export default {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  },
  modules: [StandardModule, AngularJsModule],
};
