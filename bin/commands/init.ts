// import inquirer from 'inquirer';
import fs from 'fs';
import pkgDir from 'pkg-dir';
import path from 'path';
import Listr from 'listr';
import input from 'listr-input';
import execa from 'execa';

const packages = ['sasquatch', 'ts-morph'];

const src = 'res/default.config.ts';
const destination = './sasquatch.config.ts';

const tasks = new Listr([
  {
    title: 'Setting up local sasquatch configuration file.',
    async task() {
      const dir = await pkgDir(__dirname);
      const configPath = path.join(dir, src);

      return new Listr([
        {
          title: 'Checking for existing coniguration.',
          task(ctx: any) {
            ctx.configExists = fs.existsSync(destination);
          },
        },
        {
          title: 'Overwrite existing configuration.',
          task() {
            return input('Overwrite? Y/N', {
              validate: (v: string) => !!v.length,
              done(answer: string) {
                // TODO: Move this to the end after a set of configuration options have been chosen.
                (answer.toLowerCase() === 'yes' ||
                  answer.toLowerCase() === 'y') &&
                  fs.copyFileSync(configPath, destination);
              },
            });
          },
          enabled(ctx: any) {
            return ctx.configExists;
          },
        },
      ]);
    },
  },
  {
    title: 'Install latest sasquatch packages with Yarn',
    task: (ctx, task) =>
      execa('yarn').catch(() => {
        ctx.yarn = false;
        task.skip('Yarn not available.');
      }),
  },
  {
    title: 'Install latest sasquatch packages with NPM',
    enabled: ctx => ctx.yarn === false,
    task: () => execa('npm', ['install', 'ts-morph', 'sasquatch']),
  },
]);

// const questions = [
//   {
//     type: 'input',
//     name: 'useDefault',
//     message: 'Use default values for everything?',
//     default: 'Yes',
//     choices: ['Yes', 'No'],
//   },
// ];

export const init = {
  command: 'init',
  description: 'Initializes a new sasquatch config.',
  action: async () => {
    // TODO: Add questions for common configuration choices.
    // const prompt = inquirer.createPromptModule();
    // const { useDefault } = await prompt(questions);

    try {
      tasks.run();
    } catch (e) {
      console.error(e);
    }
  },
};
