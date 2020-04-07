const { square, cube } = require('./jest-testing');

// describe groups tests on similar functions together
describe('square function', () => {
    test('square should square a number', () => {
        const res = square(3);
        expect(res).toEqual(9);
    })

    test('square should square a negative number', () => {
        const res = square(-9);
        expect(res).toEqual(81);
    })
})

describe('cube function', () => {
    test('should cube a number', () => {
        const res = cube(3);
        expect(res).toEqual(27);
    })

    test('should cube a negative number', () => {
        const res = cube(-9);
        expect(res).toEqual(-729);
    })
})
