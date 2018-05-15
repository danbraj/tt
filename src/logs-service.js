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

module.exports = { showFields, showItems };