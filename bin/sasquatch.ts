import Transformer from '../lib/transformer';
import * as meow from 'meow';
import * as glob from 'glob';
import * as ora from 'ora';
import * as path from 'path';
import defaultConfig from '../lib/default.config';

import chalk from 'chalk';

export async function run() {
  let config = defaultConfig;

  try {
    config = await import(path.join(process.cwd(), '/sasquatch.config.ts'));
  } catch (e) {
    console.log(
      chalk.yellow(
        'Unable to locate sasquatch.config.ts file. Using defaults.',
      ),
    );
  }

  const cli = meow(`
    Usage
  	  $ sasquatch <file|glob>
  `);

  const files = glob.sync(cli.input[0]);

  if (!files) {
    console.log(chalk.red('No files selected.'));
  }

  const spinner = ora(
    chalk.green(`Applying transforms to ${files.length} files...`),
  ).start();

  let errors: any[] = [];

  files.forEach(file => {
    spinner.text = file;

    try {
      Transformer(file, config.options, config.transforms);
    } catch (e) {
      errors.push({ file, message: e.message });
    }
  });

  spinner.succeed(
    chalk.green(`Applied transforms to ${files.length - errors.length} files!`),
  );

  if (errors.length) {
    console.log(chalk.red(`Error transforming ${errors.length} files:`));
    errors.forEach(error => {
      console.log(chalk.red(`  ${error.file}: ${error.message}`));
    });
  }
}
