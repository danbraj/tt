if (!checkIfConsole) throw new Error("It isn't the console!");

const { run, task } = require('./src/execution');

checkIfParamsExists() ? task() : run();

function checkIfConsole() { return typeof window === 'undefined' ? false : true; }
function checkIfParamsExists() { return process.argv.length > 2; }