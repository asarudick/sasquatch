import { Project } from 'ts-morph';
import defaultConfig from './default.config';
import Reporter from './reporting/Reporter';
import { Config } from './classes';

const defaultCfg = new Config(defaultConfig);

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
    const reporter = new Reporter(t(sources, options), analyzers.reporting);

    for (let report of reporter.report()) {
      console.log(report);
    }
  }
};
