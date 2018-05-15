const { readAppdata, writeAppdata } = require('./files-service');
const { showFields, showItems } = require('./logs-service');

const getFields = (note) => {

    showFields(note.fields);
}

const addItem = (note) => {

    const data = readAppdata(note.filename);

    const dataArgs = process.argv.slice(4);
    if (dataArgs.length > note.fields.length) {
        dataArgs.push(dataArgs.splice(note.fields.length - 1).join(' '));
    }

    let row = {};
    for (let i = 0; i < note.fields.length; i++) {
        row[note.fields[i]] = dataArgs[i] || '';
    }
    data.push(row);

    writeAppdata(note.filename, data);
}

const getItems = (note) => {

    showItems(note);
}

const getSortedItems = (note, columnIndex) => {

    const col = +columnIndex;
    const index = col >= note.fields.length ? 0 : col;

    note.rows.sort(function (a, b) {
        if (a[note.fields[index]] < b[note.fields[index]])
            return -1;
        if (a[note.fields[index]] > b[note.fields[index]])
            return 1;
        return 0;
    });

    showItems(note);
}

module.exports = { getFields, addItem, getItems, getSortedItems };