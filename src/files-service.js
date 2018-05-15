const fs = require('fs');

const readAppdata = (filename) => {

    try {
        const content = fs.readFileSync(`./appdata/${filename}`, { encoding: 'utf8' });
        return JSON.parse(content || '[]');
    } catch (e) {
        console.log('Plik nie istnieje');
        return [];
    }
};

const writeAppdata = (filename, obj) => {

    const content = JSON.stringify(obj, null, 2);
    fs.writeFileSync(`./appdata/${filename}`, content, { encoding: 'utf8' });
};

module.exports = { readAppdata, writeAppdata };