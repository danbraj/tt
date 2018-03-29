const chalk = require('chalk');
const greet = require('./Example/Greetings.js');

const isCLI = typeof window === 'undefined';

const lg = (content) => console.log(chalk.gray(content));

lg(`- Is it console?
- ${(isCLI ? chalk.green('Yup') : 'Nope')}.`);

isCLI ? lg(chalk.yellow(`> Console wrote ${chalk.bold(greet('Daniel'))}`)) : null;