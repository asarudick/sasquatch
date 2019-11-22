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
    let defaultAnalyzerConfig = {};
    let defaultTransformConfig = {};

    this.config.modules.forEach(module => {
      if (!module.plugin) return;
      if (module.plugin.analyzers)
        analyzers = { ...analyzers, ...module.plugin.analyzers };
      if (module.plugin.transforms)
        transforms = { ...transforms, ...module.plugin.transforms };

      // Determines which analyzers and transforms to use.
      // Also, only pertains to the DEFAULT config for each module.
      if (module.analyzers)
        defaultAnalyzerConfig = {
          ...defaultAnalyzerConfig,
          ...module.analyzers,
        };
      if (module.transforms)
        defaultTransformConfig = {
          ...defaultTransformConfig,
          ...module.transforms,
        };
    });

    plugin = { analyzers, transforms };

    this.config.module = {
      transforms: this.config.transforms || defaultTransformConfig,
      analyzers: this.config.analyzers || defaultAnalyzerConfig,
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

  get out() {
    return this.config.out;
  }

  get reporter() {
    return this.config.out.reporter;
  }

  get printer() {
    return this.config.out.printer;
  }

  get reporterName() {
    const keys: string[] = Object.keys(this.reporter);
    return keys && keys.length && keys[0];
  }

  get printerName() {
    const keys: string[] = Object.keys(this.printer);
    return keys && keys.length && keys[0];
  }

  get reporterOptions() {
    return this.reporter[this.reporterName];
  }

  get printerOptions() {
    return this.printer[this.printerName];
  }
}
