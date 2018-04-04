const assert = require('assert');
const greet = require('./../src/Example/Greetings.js');

describe('Example tests', function () {

    it('should be function variable', function () {

        assert.ok(typeof greet === 'function', 'greet should be a function');
    });

    it('should strings be the same in greet function', function () {

        assert.equal(
            greet('Martha'),
            'Greetings Martha!',
            'strings should be the same'
        );
    });
});