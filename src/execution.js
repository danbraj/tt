const cfg = require('./../config/sheets.json');
const { readAppdata } = require('./files-service');
const { addItem, getSortedNotesByColumnIdx } = require('./notes-service');
const { showFields, showItems, showAppInfo } = require('./logs-service');

const task = () => {

    const handle = process.argv[2];

    let notes = null;
    cfg.forEach(element => {
        if (handle === element.handle) {

            notes = element;
            notes.rows = readAppdata(notes.filename);
            return;
        }
    });

    const command = process.argv[3];
    const sortColumnIdx = process.argv[4];

    if (notes !== null && notes.row !== null) {
        // console.log(note);
        if (command == "a" || command == "add") {

            addItem(notes);

        } else if (command == "f" || command == "fields") {

            showFields(notes);

        } else if (command == "s" || command == "sort") {

            showItems(getSortedNotesByColumnIdx(notes, sortColumnIdx));

        } else {

            showItems(notes);

        }
    }
};

const run = () => {

    const { readInputs } = require('./readline-service');
    
    showAppInfo();

    let i = 1;
    let notesList = cfg.map(element => `[${i++}] ${element.name} (${element.handle})`);

    readInputs(notesList, inputs => console.log(inputs));

};

module.exports = { task, run };