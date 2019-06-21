import { Module } from './Module';

export type SasquatchConfig = {
  options?: {
    manipulationSettings?: any;
  };
  out: {
    reporter: any;
    printer: any;
  };
  modules: Module[];
};
