import { Plugin } from './Plugin';

export type Module = {
  plugin: Plugin;
  transforms: {
    use: any[];
  };
  analyzers: {
    reporting: {};
    use: any[];
  };
};
