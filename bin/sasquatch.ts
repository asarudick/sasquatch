#!/usr/bin/env node
import meow from 'meow';
import glob from 'glob';
import ora from 'ora';
import * as path from 'path';
import chalk from 'chalk';

import Transformer from '../src/transformer';
import Analyzer from '../src/analyzer';
import { ErrorMessage } from './ErrorMessage';
import defaultConfig from '../src/default.config';
import { Config } from '../src/classes';
import { decorate } from '../src/util';

let configPath = path.join(process.cwd(), '/sasquatch.config.js');

function report(prefix) {
  return decorate(original => {
    console.log(chalk.green(`${prefix}...`));

    const errors: any[] = original();

    if (errors.length) {
      console.log(chalk.red(`Errors:`));
      errors.forEach(error => {
        console.log(chalk.red(`  ${error.file}: ${error.message}`));
      });
      return;
    }

    console.log(chalk.green(`Done.`));
  });
}

class Cli {
  private config;
  private files;

  public async run() {
    const cli = meow(`
      Usage
    	  $ sasquatch <file|glob> [configfile]
    `);

    this.files = glob.sync(cli.input[0]);

    if (!this.files || !this.files.length) {
      const file = path.resolve(cli.input[0]);
      this.files = [];
      file && this.files.push(file);
    }

    if (!this.files.length) {
      console.log(
        chalk.red(`${ErrorMessage.NoFilesSelected} match ${cli.input[0]}`),
      );
      return;
    }

    const cfg = cli.input[1] && path.resolve(cli.input[1]);
    this.config = await this.loadConfig(cfg);

    this.transform(this.files);
    this.analyze(this.files);
  }

  @report('Transforming')
  transform(files) {
    return files
      .map(file => {
        try {
          Transformer(file, this.config);
        } catch (e) {
          return { file, message: e.message };
        }
        return;
      })
      .filter(i => i);
  }

  @report('Analyzing')
  analyze(files) {
    return files
      .map(file => {
        try {
          Analyzer(file, this.config);
        } catch (e) {
          return { file, message: e.message };
        }
        return;
      })
      .filter(i => i);
  }

  async loadConfig(path: string) {
    let config: any;

    const finalPath = path || configPath;

    try {
      config = (await import(finalPath)).default;
      console.log(chalk.green(`Using ${finalPath}`));
    } catch (e) {
      console.log(`Error importing ${finalPath}: ${e.message}`);
    }

    return new Config(config || defaultConfig);
  }
}
new Cli().run();
