import { Project } from 'ts-morph';
import * as Transforms from './transforms';
import * as Analyzers from './analyzers';
import config from './default.config';

export default (
  files: string[],
  options = config.options,
  transforms = config.transforms,
) => {
  const project = new Project(options);

  const sources = project.addExistingSourceFiles(files);

  for (const transform of transforms.use) {
    const t = Transforms[transform];

    if (!t) {
      console.warn(`${transform} transform not found.`);
      continue;
    }

    t(sources);
  }

  project.save();
};
