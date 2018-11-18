import { Project } from 'ts-simple-ast';
import * as Analyzers from './analyzers';
import config from './default.config';
import chalk from 'chalk';
import Reporter from './reporting/reporter';

export default (files: string[], analyzers = config.analyzers) => {
  const project = new Project();

  const sources = project.addExistingSourceFiles(files);
  let reports = [];

  for (const analyzer in analyzers.use) {
    const t = Analyzers[analyzer];
    const options = analyzers.use[analyzer];

    if (!t) {
      console.warn(`${analyzer} analyzer not found.`);
      continue;
    }

    reports = reports.concat(t(sources, options));
  }

  // flatten and filter out undefined.
  reports = reports.flat().filter(r => r);

  const reporter = new Reporter(reports, analyzers.reporting);
  reporter.report(console.log);
};
