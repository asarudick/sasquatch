import inquirer from 'inquirer';
import fs from 'fs';
import pkgDir from 'pkg-dir';
import path from 'path';

const questions = [
  {
    type: 'input',
    name: 'useDefault',
    message: 'Use default values for everything?',
    default: 'Yes',
    choices: ['Yes', 'No'],
  },
];

export const init = {
  command: 'init',
  description: 'Initializes a new sasquatch config.',
  action: async () => {
    const prompt = inquirer.createPromptModule();
    const { useDefault } = await prompt(questions);
    try {
      const dir = await pkgDir(__dirname);

      useDefault &&
        fs.copyFileSync(
          path.join(dir, 'src/default.config.js'),
          './sasquatch.config.js',
        );
    } catch (e) {
      console.error(e);
    }
  },
};
