import * as merge from 'lodash/merge';

export class Config {
  constructor(public config) {
    // Simple merge into a single module.
    this.config.module = merge({}, ...this.config.modules);
    // console.log(this.config.module);
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
