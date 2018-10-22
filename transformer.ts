import { Project } from 'ts-simple-ast';
import ProjectConfig from './project.config';

import * as Transforms from './transforms';
import TransformsConfig from './transforms.config';

export default (
  files: string[],
  projectConfig = ProjectConfig,
  transformsConfig = TransformsConfig,
) => {
  const project = new Project(projectConfig);

  const sources = project.addExistingSourceFiles(files);

  for (const transform of transformsConfig.use) {
    const t = Transforms[transform];

    if (!t) {
      console.warn(`${transform} transform not found.`);
      continue;
    }

    t(sources);
  }

  project.save();
};
