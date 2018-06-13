const readline = require('readline');
const cfg = require('./../config/sheets.json');
const { readAppdata } = require('./files-service');
const { addItem, getFields, getSortedItems, getItems } = require('./notes-service');
const { showAppInfo } = require('./logs-service');
const { readInputs } = require('./readline-service');

const task = () => {

    const handle = process.argv[2];

    let note = null;
    cfg.forEach(element => {
        if (handle === element.handle) {

            note = element;
            note.rows = readAppdata(note.filename);
            return;
        }
    });

    const command = process.argv[3];
    const sortColumnIdx = process.argv[4];

    if (note !== null && note.row !== null) {
        // console.log(note);
        if (command == "a" || command == "add") {
            addItem(note);
        } else if (command == "f" || command == "fields") {
            getFields(note);
        } else if (command == "s" || command == "sort") {
            getSortedItems(note, sortColumnIdx);
        } else {
            getItems(note);
        }
    }
};

const run = () => {

    showAppInfo();

    let i = 1;
    let notesList = cfg.map(element => `[${i++}] ${element.name} (${element.handle})`);

    readInputs(notesList, inputs => console.log(inputs));

};

module.exports = { task, run };