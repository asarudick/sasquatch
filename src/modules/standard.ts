import { Module } from '../types';
import * as analyzers from '../analyzers';

// The 'standard' module. Comes with the most fundamental and basic transforms
// and analyzers.

// Note: Modules are comprised of: A plugin, which houses the available
// transforms and analyzers; and configurations for said transforms and analyzers.
// This structure allows for easy extensibility, while providing author
// intuited defaults.
export const StandardModule: Module = {
  plugin: {
    analyzers,
  },
  analyzers: {
    use: {
      LongFunction: {
        maxLength: 25,
      },
      ArgumentCount: {
        max: 7,
      },
      LongFile: {
        max: 200,
      },
      MethodCount: {
        max: 7,
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
