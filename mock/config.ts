import { IndentationText, QuoteKind } from 'ts-morph';
import MockPlugin from '../mock/plugin';
// import { Config } from './classes';

// TODO: Not do this.
import * as analyzers from '../src/analyzers';
import * as transforms from '../src/transforms';

const test = {
  plugin: MockPlugin,
  transforms: {
    use: [],
  },
  analyzers: {
    use: [],
  },
};

const base = {
  plugin: {
    analyzers: Object.values(analyzers),
    transforms: Object.values(transforms),
  },
  transforms: {},
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
