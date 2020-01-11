import inquirer from 'inquirer';

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

    const answers = await prompt(questions);
    console.log(answers.useDefault);
  },
};
