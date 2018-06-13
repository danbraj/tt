const { readAppdata, writeAppdata } = require('./files-service');

const addItem = (notes) => {

    const data = readAppdata(notes.filename);

    const dataArgs = process.argv.slice(4);
    if (dataArgs.length > notes.fields.length) {
        dataArgs.push(dataArgs.splice(notes.fields.length - 1).join(' '));
    }

    let row = {};
    for (let i = 0; i < notes.fields.length; i++) {
        row[notes.fields[i]] = dataArgs[i] || '';
    }
    data.push(row);

    writeAppdata(notes.filename, data);
}

const getSortedNotesByColumnIdx = (notes, columnIndex) => {

    const col = +columnIndex;
    const index = col >= notes.fields.length ? 0 : col;

    notes.rows.sort(function (a, b) {
        if (a[notes.fields[index]] < b[notes.fields[index]])
            return -1;
        if (a[notes.fields[index]] > b[notes.fields[index]])
            return 1;
        return 0;
    });

    return notes;
}

module.exports = { addItem, getSortedNotesByColumnIdx };