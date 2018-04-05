const fs = require('fs');
const path = require("path");

const getFields = (note) => {

    console.log(`\$ Fields: ${note.fields.join(', ')}`);
}

const addItem = (note) => {

    let data = JSON.parse(fs.readFileSync(`${ROOT_DIR}/${note.path}`, 'utf8') || '[]');

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

    fs.writeFileSync(`${ROOT_DIR}/${note.path}`, JSON.stringify(data, null, 2));
}

const getItems = (note) => {

    showItems(note);
}

const sortItems = (note, column) => {

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
    showItems(note);
}

const showItems = (note) => {

    console.log(`Notes: ${note.name}`);
    console.log(note.fields.join('\t'));
    note.rows.forEach(element => {
        console.log(Object.values(element).join('\t'));
    });
    // console.log(note);
}

module.exports = { getFields, addItem, getItems, sortItems };