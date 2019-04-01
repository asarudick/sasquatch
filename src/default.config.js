const StandardModule = require('./modules');
const { IndentationText, QuoteKind } = require('ts-morph');

module.exports = {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  },
  modules: [StandardModule],
};
