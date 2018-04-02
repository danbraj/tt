#! /usr/bin/env node
const checkIfConsole = () => typeof window === 'undefined' ? false : true;

if (!checkIfConsole) throw new Error("It isn't the console!");

var chalk = require('chalk');
var path = require("path");
var fs = require('fs');

const cfg = require(path.resolve(__dirname, "../config/sheets.json"));

// console.log(process.argv);    
const handle = process.argv[2];

let note = '';
cfg.forEach(element => {
    if (handle === element.handle) {

        note = element;
        try {
            note.rows = JSON.parse(fs.readFileSync(path.resolve(__dirname, note.path), 'utf8') || '[]');
        } catch (ex) {
            console.log(chalk.bold.red(`\$ ${element.path} doesn't exist`));
        }
        return;
    }
});

const command = process.argv[3];

if (note !== '' && note.rows !== '') {
    // console.log(note);
    if (command == "-a" || command == "add") {
        addRecord(note);
    } else if (command == "-f" || command == "fields") {
        getFields(note);
    } else if (command == "-s" || command == "sort") {
        getRecords(sortRecords(note, process.argv[4]));
    } else {
        getRecords(note);
    }
}

function getFields(note) {
    console.log(`\$ Fields: ${note.fields.join(', ')}`);
}

function addRecord(note) {

    let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, note.path), 'utf8') || '[]');

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

    fs.writeFileSync(path.resolve(__dirname, note.path), JSON.stringify(data, null, 2));
}

function getRecords(note) {
    console.log(`Notes: ${note.description}`);
    console.log(note.fields.join('\t'));
    note.rows.forEach(element => {
        console.log(Object.values(element).join('\t'));
    });
    // console.log(note);
}

function sortRecords(note, column) {
    const col = Number(column);
    const index = col >= note.fields.length ? 0 : col;
    // console.log(index);
    note.rows.sort(function (a, b) {
        if (a[note.fields[index]] < b[note.fields[index]])
            return -1;
        if (a[note.fields[index]] > b[note.fields[index]])
            return 1;
        return 0;
    });
    return note;
}