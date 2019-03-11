import * as TestPlugin from './analyzers';
import { Plugin } from '../../src/types';

export default {
  analyzers: {
    NoSelect: TestPlugin.NoSelect,
  },
  transforms: {},
} as Plugin;
