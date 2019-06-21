const StandardModule = require('./modules');
const { IndentationText, QuoteKind } = require('ts-morph');

export const {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  },
  reporting: {
    use: {
      summary: {
        maxLength: 25,
      },
    },
  },
  modules: [StandardModule],
};
