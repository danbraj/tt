const expect = require('chai').expect;

const { readAppdata, writeAppdata } = require('./../src/files-service');

describe('Files service module', function () {

    describe('Check correctness functions types', function() {

        it('"readAppdata" should be function variable', function () {

            expect(readAppdata).to.be.a('function');
        });

        it('"writeAppdata" should be function variable', function () {

            expect(writeAppdata).to.be.a('function');
        });

    });
    
});