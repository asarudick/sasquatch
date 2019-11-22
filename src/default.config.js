'use strict';
exports.__esModule = true;
var modules_1 = require('./modules');
var ts_morph_1 = require('ts-morph');
exports['default'] = {
  options: {
    manipulationSettings: {
      indentationText: ts_morph_1.IndentationText.TwoSpaces,
      quoteKind: ts_morph_1.QuoteKind.Single,
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
  modules: [modules_1.StandardModule],
};
