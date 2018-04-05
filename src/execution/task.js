const chalk = require('chalk');
const fs = require('fs');
const path = require("path");

const cfg = require(`${ROOT_DIR}/config/sheets.json`);
const service = require(`${ROOT_DIR}/src/service/notes-service.js`);

const start = () => {
    // console.log(process.argv);    
    const handle = process.argv[2];

    let note = '';
    cfg.forEach(element => {
        if (handle === element.handle) {

            note = element;
            try {
                note.rows = JSON.parse(fs.readFileSync(`${ROOT_DIR}/${note.path}`, 'utf8') || '[]');
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
            service.addItem(note);
        } else if (command == "-f" || command == "fields") {
            service.getFields(note);
        } else if (command == "-s" || command == "sort") {
            service.sortItems(note, process.argv[4]);
        } else {
            service.getItems(note);
        }
    }
}

module.exports = start;