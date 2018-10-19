import { Project } from 'ts-simple-ast';
import ProjectConfig from './project.config';

import * as Transforms from './transforms';
import TransformsConfig from './transforms.config';


export default (files: string[]) => {
  const project = new Project(ProjectConfig);

  const sources = project.addExistingSourceFiles(files);

  for (const transform of TransformsConfig.use) {
    const t = Transforms[transform];

    if (!t) {
      console.warn(`${transform} transform not found.`);
      continue;
    }

    t(sources);
  }

  project.save();
}
