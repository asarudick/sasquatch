import * as Analyzers from './analyzers';
import { Plugin } from '../../src/types';

export default {
  analyzers: {
    NoSelect: Analyzers.NoSelect,
  },
  transforms: {},
} as Plugin;
