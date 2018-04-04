const assert = require('assert');
const expect = require('chai').expect;

const greet = require('./../src/Example/Greetings.js');

describe('Example tests', function () {

    it('should be function variable', function () {

        expect(greet).to.be.a('function');
    });

    it('should strings be the same in greet function', function () {

        expect(greet('Martha')).to.equal('Greetings Martha!');
    });
});