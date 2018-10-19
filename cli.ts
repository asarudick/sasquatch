import Transform from './';
import * as meow from 'meow';
import * as  glob from 'glob';
import chalk from 'chalk';

const cli = meow(`
  Usage
	  $ codemod <file|glob>
`);

const files = glob.sync(cli.input[0]);

if (!files){
  console.log(chalk.red('No files selected.'));
}

Transform(files);
