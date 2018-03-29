
const greet = require('./Example/Greetings.js');

const isCLI = typeof window === 'undefined';

console.log(`- Is it console?
- ${(isCLI ? 'Yup' : 'Nope')}.`);

isCLI ? console.log(`> Console wrote ${greet('Daniel')}`) : null;