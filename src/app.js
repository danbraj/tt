
const greet = require('./Example/Greetings.js');
const path = require('path');

const pathObj = path.parse(__filename);

console.log(`${pathObj.base} wrote ${greet('Daniel')}`);