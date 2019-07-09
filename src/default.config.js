const StandardModule = require('../lib/src/modules');
const { IndentationText, QuoteKind } = require('ts-morph');

module.exports = {
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
