#! /usr/bin/env node
const chalk = require('chalk');

console.log('- Is it console?');
if (typeof window !== 'undefined') {

    console.log('- Nope.');
    throw new Error("It isn't the console!");

} else {

    const cfg = require('./../config/sheets.json');

    console.log(`- ${chalk.green('Yup')}.`);
  
    // console.log(process.argv);    
    const handle = process.argv[2];

    let note = '';
    cfg.forEach(element => {
        if (handle === element.handle) {
            try {
                note = {
                    note: require(element.path),
                    element: element
                }
            } catch (ex) {
                console.log(chalk.bold.red(`\$ ${element.path} doesn't exist`));
            }
            return;
        }
    });

    const command = process.argv[3];

    if (note !== '') {
        // console.log(note);

        if (command == "-a" || command == "add") {
            addRecord(note);
        } else if (command == "-f" || command == "fields") {
            getFields(note);
        } else if (command == "-s" || command == "sort") {
            sortRecords(note);
        } else {
            getRecords(note);
        }
    }
}

function getFields(note) {
    console.log(`\$ Fields: ${note.element.fields.join(', ')}`);
}

function addRecord(note) {
    console.log(chalk.cyan('to implement'));
}

function getRecords(note) {
    console.log(note.note);
}

function sortRecords(note) {
    console.log(chalk.cyan('to implement'));
}