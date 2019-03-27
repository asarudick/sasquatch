import { Project } from 'ts-morph';
import * as Transforms from './transforms';
import * as Analyzers from './analyzers';
import { Config } from './classes';
import defaultConfig from './default.config';

const config = new Config(defaultConfig);

export default (
  files: string[],
  options = config.options,
  transforms = config.transforms,
) => {
  if (!transforms) return;
  const project = new Project(options);

  const sources = project.addExistingSourceFiles(files);

  for (const transform of Object.keys(transforms.use)) {
    const t = Transforms[transform];

    if (!t) {
      console.warn(`${transform} transform not found.`);
      continue;
    }

    t(sources);
  }

  project.save();
};
