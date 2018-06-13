const readline = require('readline');
const cfg = require('./../config/sheets.json');
const { readAppdata } = require('./files-service');
const { addItem, getFields, getSortedItems, getItems } = require('./notes-service');
const { showAppInfo } = require('./logs-service');

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

    const r = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    showAppInfo();

    let i = 1;
    let notesList = cfg.map(element => `[${i++}] ${element.name} (${element.handle})`);

    r.question(`${notesList.join('\n')}\nChoose notes: `, (notes) => {

        r.question(`[1] Show\n[2] Add\n[3] Sort by\n[4] Get fields\nChoose action: `, (action) => {

            const a = +action;
            switch (a) {
                case 1:
                    console.log('action 1');
                    break;
                case 2:
                    r.question('Enter values (separator " "): ', (content) => {
                        console.log(`action 2 - ${content}`);
                        r.close();
                    });
                    break;
                case 3:
                    r.question('Sort by index: ', (idx) => {
                        console.log(`action 3 - ${idx}`);
                        r.close();
                    });
                    break;
                case 4:
                    console.log('action 4');
                    break;
            
                default:
                    break;
            };
            a != 2 && a != 3 ? r.close() : null;
        });

    });
};

module.exports = { task, run };