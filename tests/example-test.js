const greet = require('./../src/Example/Greetings.js');

QUnit.test('check if variable is function', function (assert) {

    assert.ok(typeof greet === 'function', 'greet should be a function');
});

QUnit.test('check correctness greetings function', function (assert) {
    
    assert.equal(
        greet('Martha'),
        'Greetings Martha!',
        'strings should be the same'
    );
});

