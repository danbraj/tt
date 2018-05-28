const showFields = (fields) => {

    console.log(`\nFields: ${fields.join(', ')}`);
};

const showItems = (note) => {

    console.log(`\nNotes: ${note.name}`);
    console.log(note.fields.join('\t'));
    note.rows.forEach(element => {
        console.log(Object.values(element).join('\t'));
    });
};

const showAppInfo = () => {
    console.log(`
notes-cli @ danbraj

Welcome to the Notes CLI app! 
Version: 0.0.1.
`);
}

module.exports = { showFields, showItems, showAppInfo };