import { Project } from 'ts-morph';
import { Config } from './classes';
import defaultConfig from './default.config';

const defaultCfg = new Config(defaultConfig);

export default (files: string[], config: any = defaultCfg) => {
  const { plugin, transforms } = config.config.module;
  const { options } = config.config;
  if (!transforms) return;
  const project = new Project(options);

  const sources = project.addExistingSourceFiles(files);

  for (const transform of Object.keys(transforms.use)) {
    const t = plugin.transforms[transform];
    if (!t) {
      console.warn(`${transform} transform not found.`);
      continue;
    }

    t(sources);
  }

  project.save();
};
