import { Project } from 'ts-morph';
import defaultConfig from './default.config';
import { Summary as Reporter } from './reporters/';
import { Base as Printer } from './printers/';
import { Config } from './classes';
import { SasquatchConfig } from './types';

const defaultCfg = new Config(defaultConfig);
const printer = new Printer();

export default (files: string[], config: any = defaultCfg) => {
  const { plugin, analyzers } = config.config.module;
  if (!analyzers || !analyzers.use) return;
  const project = new Project();

  const sources = project.addExistingSourceFiles(files);

  for (const analyzer of Object.keys(analyzers.use)) {
    const t = plugin.analyzers[analyzer];
    const options = analyzers.use[analyzer];

    if (!t) {
      console.warn(`${analyzer} analyzer not found.`);
      continue;
    }
    const reporter = new Reporter(t(sources, options), config.reporting);

    for (let report of reporter.report()) {
      printer.add(report);
    }
  }
  printer.flush();
};
