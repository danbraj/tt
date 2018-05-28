const expect = require('chai').expect;

const { showFields, showItems } = require('./../src/logs-service');

describe('Files service module', function () {

    it('"showFields" should be function variable', function () {

        expect(showFields).to.be.a('function');
    });

    it('"showItems" should be function variable', function () {

        expect(showItems).to.be.a('function');
    });
});