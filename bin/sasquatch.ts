#!/usr/bin/env node
import meow from 'meow';
import glob from 'glob';
import * as path from 'path';
import chalk from 'chalk';
import commander from 'commander';

import { importTypescript } from './importTypescript';

import * as commands from './commands';

import Transformer from '../src/transformer';
import Analyzer from '../src/analyzer';
import { ErrorMessage } from './ErrorMessage';
import defaultConfig from '../src/default.config';
import { Config } from '../src/classes';
import { decorate } from '../src/util';

let configPath = path.join(process.cwd(), '/sasquatch.config.ts');

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

  private setupCommands(program) {

    // Main command.
    program
    .arguments('<glob> [configfile]')
    .action((glob, cfg) => this.defaultCommandAction(glob, cfg));

    // Subcommands.
    // Loop through all imported commands from the /commands directory.
    for (let key in commands) {
      const command = commands[key];

      // Attaching command properties is done via chaining, so we have to get a reference first.
      let prompt = program.command(command.command);

      for (let prop in command) {
        // Already did command.
        if (prop === 'command') continue;
        prompt[prop](command[prop]);
      }
    }
  }

  private async defaultCommandAction(globPattern: string, configPath: string) {
    const fileArg = globPattern;

    this.files = glob.sync(fileArg);

    if (!this.files?.length) {
      const file = path.resolve(fileArg);
      this.files = [];
      file && this.files.push(file);
    }

    if (!this.files.length) {
      console.log(
        chalk.red(`${ErrorMessage.NoFilesSelected} match ${fileArg}`),
      );
      return;
    }

    const cfg = configPath && path.resolve(configPath);
    this.config = await this.loadConfig(cfg);

    this.transform(this.files);
    this.analyze(this.files);
  }

  public async run() {
    const program = new commander.Command();
    this.setupCommands(program);
    program.parse(process.argv);
  }

  @report('Transforming')
  transform(files: string[]) {
    return files
      .map((file: string) => {
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
  analyze(files: string[]) {
    return files
      .map((file: string) => {
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

    const finalPath = path ?? configPath;

    try {
      config = importTypescript(finalPath).default;
      console.log(chalk.green(`Using ${finalPath}`));
    } catch (e) {
      console.log(`Error importing ${finalPath}: ${e.message}`);
    }

    return new Config(config ?? defaultConfig);
  }
}
new Cli().run();
