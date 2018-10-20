#!/usr/bin/env ts-node
import Transformer from './transformer';
import * as meow from 'meow';
import * as  glob from 'glob';
import * as ora from 'ora';
import chalk from 'chalk';

const cli = meow(`
  Usage
	  $ codemod <file|glob>
`);

const files = glob.sync(cli.input[0]);

if (!files){
  console.log(chalk.red('No files selected.'));
}

const spinner = ora(chalk.green(`Applying transforms to ${files.length} files...`)).start();
let errors = [];

files.forEach((file) => {
  spinner.text = file;

  try {
    Transformer(file);
  }
  catch (e) {
    errors.push({file, message: e.message});
  }
});

spinner.succeed(chalk.green(`Applied transforms to ${files.length - errors.length} files!`));

if (errors) {
  console.log(chalk.red(`Error transforming ${errors.length} files:`));
  errors.forEach((error) => {
    console.log(chalk.red(`  ${error.file}: ${error.message}`));
  });
}
