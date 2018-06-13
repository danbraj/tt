const showFields = (notes) => {

    console.log(`\nFields: ${notes.fields.join(', ')}`);
};

const showItems = (notes) => {

    console.log(`\nNotes: ${notes.name}`);
    console.log(notes.fields.join('\t'));
    notes.rows.forEach(element => {
        console.log(Object.values(element).join('\t'));
    });
};

const showAppInfo = () => {
    console.log(`
notes-cli @ danbraj

Welcome to the Notes CLI app! 
Version: 0.1.2
`);
}

module.exports = { showFields, showItems, showAppInfo };