import { Project } from 'ts-morph';
import * as Analyzers from './analyzers';
import config from './default.config';
import chalk from 'chalk';
import Reporter from './reporting/Reporter';

export default (files: string[], analyzers = config.analyzers) => {
  const project = new Project();

  const sources = project.addExistingSourceFiles(files);

  for (const analyzer in analyzers.use) {
    const t = Analyzers[analyzer];
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
