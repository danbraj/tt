const expect = require('chai').expect;

describe('Numbering module tests', function () {

    const tCases = [
        {
            data: 1,
            modifier: 2,
            expected: '12'
        },
        {
            data: 'a',
            modifier: '2',
            expected: 'a2'
        },
        {
            data: 1,
            modifier: 'a',
            expected: '1a'
        }
    ]

    const numberingTest = (tCase) => {
        return () => {
            expect(`${tCase.data}${tCase.modifier}`).to.equal(tCase.expected);;
        }
    }

    tCases.forEach((tCase) => {
        it('should strings be the same', numberingTest(tCase));
    });
});