import { Module } from '../types';
import * as transforms from '../transforms';

export const AngularJSModule: Module = {
  plugin: {
    transforms,
  },
  transforms: {
    use: {
      AddBuiltInAngularTypes: {},
      AddBuiltInAngularTypesNgInject: {},
      ReplaceNgInjectWith$inject: {},
    },
  },
};
