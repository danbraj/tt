#! /usr/bin/env node
if (!checkIfConsole) throw new Error("It isn't the console!");

const path = require("path");
global.ROOT_DIR = path.resolve(__dirname, './..');

const program = checkIfParamsExists() ? require(`${ROOT_DIR}/src/execution/task.js`) : require(`${ROOT_DIR}/src/execution/run.js`);

program();

function checkIfConsole() { return typeof window === 'undefined' ? false : true; }
function checkIfParamsExists() { return process.argv.length > 2; }