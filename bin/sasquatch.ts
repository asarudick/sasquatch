#!/usr/bin/env node
import * as meow from 'meow';
import * as glob from 'glob';
import * as ora from 'ora';
import * as path from 'path';
import chalk from 'chalk';

import Transformer from '../src/transformer';
import Analyzer from '../src/analyzer';
import { ErrorMessage } from './ErrorMessage';
import defaultConfig from '../src/default.config';

const configPath = path.join(process.cwd(), '/sasquatch.config.ts');

class Cli {
  private config;

  async run() {
    const cli = meow(`
      Usage
    	  $ sasquatch <file|glob>
    `);

    const files = glob.sync(cli.input[0]);

    if (!files) {
      console.log(chalk.red(ErrorMessage.NoFilesSpecified));
    }

    this.config = await this.loadConfig();

    this.transform(files);
    this.analyze(files);
  }

  transform(files) {
    const spinner = ora(
      chalk.green(`Transformed ${files.length} files...`),
    ).start();

    let errors: any[] = [];

    files.forEach(file => {
      spinner.text = file;

      try {
        Transformer(file, this.config.options, this.config.transforms);
      } catch (e) {
        errors.push({ file, message: e.message });
      }
    });

    spinner.succeed(
      chalk.green(`Transformed ${files.length - errors.length} files!`),
    );

    if (errors.length) {
      console.log(chalk.red(`Error transforming ${errors.length} files:`));
      errors.forEach(error => {
        console.log(chalk.red(`  ${error.file}: ${error.message}`));
      });
    }
  }

  analyze(files) {
    const errors = [];

    const spinner = ora(
      chalk.green(`Analyzing ${files.length} files...`),
    ).start();

    files.forEach(file => {
      spinner.text = file;

      try {
        Analyzer(file, this.config.analyzers);
      } catch (e) {
        errors.push({ file, message: e.message });
      }
    });

    spinner.succeed(
      chalk.green(`Analyzed ${files.length - errors.length} files!`),
    );

    if (errors.length) {
      console.log(chalk.red(`Error analyzing ${errors.length} files:`));
      errors.forEach(error => {
        console.log(chalk.red(`  ${error.file}: ${error.message}`));
      });
    }
  }

  async loadConfig() {
    let config;

    try {
      config = await import(configPath);
    } catch (e) {
      console.log(chalk.yellow(ErrorMessage.ConfigNotFound));
    }

    return config || defaultConfig;
  }
}
new Cli().run();
