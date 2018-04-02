#! /usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');

console.log('- Is it console?');
if (typeof window !== 'undefined') {

    console.log('- Nope.');
    throw new Error("It isn't the console!");

} else {

    const cfg = require('./../config/sheets.json'); // FIXME: trzeba będzie ustalić ścieżkę bezwzględną

    console.log(`- ${chalk.green('Yup')}.`);
  
    // console.log(process.argv);    
    const handle = process.argv[2];

    let note = '';
    cfg.forEach(element => {
        if (handle === element.handle) {

            note = element;
            try {
                note.rows = require(element.path); // FIXME: wywala błąd, gdy plik jest jeszcze pusty, ale dodaje prawidłowo..
            } catch (ex) {
                console.log(chalk.bold.red(`\$ ${element.path} doesn't exist`));
            }
            return;
        }
    });

    const command = process.argv[3];

    if (note.rows !== '') {
        // console.log(note);
        if (command == "-a" || command == "add") {
            addRecord(note);
        } else if (command == "-f" || command == "fields") {
            getFields(note);
        } else if (command == "-s" || command == "sort") {
            sortRecords(note, process.argv[4]);
        } else {
            getRecords(note);
        }
    }
}

function getFields(note) {
    console.log(`\$ Fields: ${note.fields.join(', ')}`);
}

function addRecord(note) {
    // FIXME: ścieżka do pliku, nie podoba się format
    let data = JSON.parse(fs.readFileSync('notes/linki.json', 'utf8') || '[]'); // note.path
    
    const dataArgs = process.argv.slice(4);

    if (dataArgs.length > note.fields.length) {
        dataArgs.push(dataArgs.splice(note.fields.length - 1).join(' '));
    }

    let row = {};
    for (let i = 0; i < note.fields.length; i++) {
        row[note.fields[i]] = dataArgs[i] || '';
    }

    console.log(row);
    data.push(row);

    fs.writeFileSync('notes/linki.json', JSON.stringify(data, null, 2)); // note.path
}

function getRecords(note) {
    console.log(note);
}

function sortRecords(note, column) {
    const index = Number(column) >= note.fields.length ? 0 : Number(column);
    // console.log(index);
    console.log(
        note.rows.sort(function(a, b) {
            if (a[note.fields[index]] < b[note.fields[index]])
                return -1;
            if (a[note.fields[index]] > b[note.fields[index]])
                return 1;
            return 0;
        })
    );
}