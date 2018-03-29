#! /usr/bin/env node
console.log('- Is it console?');
if (typeof window !== 'undefined') {

    console.log('- Nope.');
    throw new Error("It isn't the console!");

} else {

    const chalk = require('chalk');
    const cfg = require('./../config/sheets.json');

    console.log(`- ${chalk.green('Yup')}.`);
  
    // console.log(process.argv);    
    const handle = process.argv[2];
    const command = process.argv[3];

    let note = '';
    cfg.forEach(element => {
        if (handle === element.handle) {
            try {
                note = require(element.path);
            } catch (ex) {
                console.log(chalk.bold.red(`\$ ${element.path} doesn't exist`));
            }
            return;
        }
    });

    if (note !== '') {
        console.log(note);
    }
}

function getFields() {

}

function addRecord() {

}

function getRecords() {

}

function sortRecords() {

}