import { Plugin } from './Plugin';

export type Module = {
  plugin: Plugin;
  transforms?: {
    use: {};
  };
  analyzers?: {
    use: {};
  };
};
