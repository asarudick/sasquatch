import { Analyzer } from './Analyzer';
import { Transform } from './Transform';

export type Plugin = {
  analyzers: { [key: string]: Analyzer };
  transforms: { [key: string]: Transform };
};
