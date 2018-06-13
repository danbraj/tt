const readline = require('readline');

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readNotes = (notesList) => {

    return new Promise((resolve) => {

        r.question(`${notesList.join('\n')}\nChoose notes: `, (notes) => {

            resolve(notes);
        });
    });
};

const readAction = (notes) => {

    return new Promise((resolve) => {

        r.question(`[1] Show\n[2] Add\n[3] Sort by\n[4] Get fields\nChoose action: `, (action) => {

            resolve({notes: notes, action: +action});
        });
    });
};

const readExtra = (data) => {

    return new Promise((resolve) => {

        if (data.action == 1 || data.action == 4) {

            resolve(data);

        } else {

            let quest = '';
            if (data.action == 2) {
                quest = 'Enter values (separator " "): ';
            } else if (data.action == 3) {
                quest = 'Sort by index: ';
            }

            r.question(quest, (extra) => {

                data.extra = extra;
                resolve(data);
            });
        };
    });
}

const readInputs = (notesList, cb) => {

    return readNotes(notesList).then(readAction).then(readExtra).then(cb).then(() => r.close());
};

module.exports = { readInputs };