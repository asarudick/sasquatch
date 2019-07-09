"use strict";
exports.__esModule = true;
var modules_1 = require("./modules");
var ts_morph_1 = require("ts-morph");
exports["default"] = {
    options: {
        manipulationSettings: {
            indentationText: ts_morph_1.IndentationText.TwoSpaces,
            quoteKind: ts_morph_1.QuoteKind.Single
        }
    },
    out: {
        reporter: {
            summary: {
                maxLength: 25
            }
        },
        printer: {
            base: {}
        }
    },
    modules: [modules_1.StandardModule]
};
