import { IndentationText, QuoteKind } from 'ts-morph';
import MockPlugin from '../mock/plugin';
// import { Config } from './classes';

import * as analyzers from './analyzers';
import * as transforms from './transforms';

const test = {
  plugin: MockPlugin,
  transforms: {
    use: {},
  },
  analyzers: {
    use: {},
  },
};

const base = {
  plugin: {
    analyzers,
    transforms,
  },
  transforms: {
    use: {
      AddBuiltInAngularTypes: {},
      AddBuiltInAngularTypesNgInject: {},
      ReplaceNgInjectWith$inject: {},
    },
  },
  analyzers: {
    reporting: {
      maxLength: 25,
    },
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
};

export default {
  options: {
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  },
  modules: [base, test],
};
