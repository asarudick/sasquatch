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

const configPath = path.join(process.cwd(), '/sasquatch.config.js');

function report(prefix) {
  return decorate(original => {
    const spinner = ora(chalk.green(`${prefix}...`)).start();

    const errors: any[] = original();

    if (errors.length) {
      spinner.fail(`Errors:`);
      errors.forEach(error => {
        console.log(chalk.red(`  ${error.file}: ${error.message}`));
      });
      return;
    }

    spinner.succeed(chalk.green(`${prefix}...done.`));
  });
}

class Cli {
  private config;
  private files;

  public async run() {
    const cli = meow(`
      Usage
    	  $ sasquatch <file|glob>
    `);

    this.files = glob.sync(cli.input[0]);

    if (!this.files) {
      console.log(chalk.red(ErrorMessage.NoFilesSpecified));
    }

    this.config = this.loadConfig();

    this.transform(this.files);
    this.analyze(this.files);
  }

  @report('Transform')
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

  @report('Analyze')
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

  loadConfig() {
    let config;

    try {
      config = require(configPath);
    } catch (e) {
      console.log(e);
      console.log(chalk.yellow(ErrorMessage.ConfigNotFound));
    }

    return new Config(config || defaultConfig);
  }
}
new Cli().run();
