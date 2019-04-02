export class Config {
  public config;
  constructor(config) {
    this.config = { ...config };
    // "Simple" merge into a single module.
    this.mergeModules();
  }

  mergeModules() {
    let plugin = {};
    let analyzers = {};
    let transforms = {};
    let analyzerConfig = {};
    let transformConfig = {};

    this.config.modules.forEach(module => {
      if (!module.plugin) return;
      if (module.plugin.analyzers)
        analyzers = { ...analyzers, ...module.plugin.analyzers };
      if (module.plugin.transforms)
        transforms = { ...transforms, ...module.plugin.transforms };
      if (module.analyzers)
        analyzerConfig = { ...analyzerConfig, ...module.analyzers };
      if (module.transforms)
        transformConfig = { ...transformConfig, ...module.transforms };
    });

    plugin = { analyzers, transforms };
    this.config.module = {
      transforms: transformConfig,
      analyzers: analyzerConfig,
      plugin,
    };
  }

  get plugin() {
    return this.config.module.plugin;
  }

  get options() {
    return this.config.options;
  }

  get transforms() {
    return this.config.module.transforms;
  }

  get analyzers() {
    return this.config.module.analyzers;
  }
}
