describe('calculateTaxes() tests:', () => {
    it('should calculate the high tax bracket', () => {
        expect(calculateTaxes(50000)).toEqual(12500);
        expect(calculateTaxes(100000)).toEqual(25000);
    });

    it('should calculate the low tax bracket', () => {
        expect(calculateTaxes(10000)).toEqual(1500);
        expect(calculateTaxes(1000)).toEqual(150);
        expect(calculateTaxes(0)).toEqual(0);
    });
    it('should should reject invalid incomes', () => {
        expect(() => calculateTaxes('test')).toThrowError();
        expect(() => calculateTaxes([])).toThrowError();
        expect(() => calculateTaxes(true)).toThrowError();
    });
});

describe('removeDupes() tests:', () => {
    it('should remove duplicates from an array', () => {
        expect(removeDupes([1, 1, 2, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(removeDupes([1, 2, 3])).toEqual([1, 2, 3]);
        expect(removeDupes([1, 2, 3])).toBeInstanceOf(Array);
    });

    it('should remove duplicates from a string', () => {
        expect(removeDupes('hello')).toEqual('helo');
        expect(removeDupes('hello')).toBeInstanceOf(String);
    });
});

describe('remove() tests:', () => {
    it('should remove value from array', () => {
        expect(remove([1, 2, 3, 4, 5, 6], 6)).not.toContain(6);
    });
});

describe('submitForm() tests:', () => {
    it('should save input value to usernames array', () => {
        input.value = 'test1';
        submitForm();
        expect(usernames.length).toBe(1);
        expect(usernames).toContain('test1');
    });
});

beforeAll(() => {
    console.log("I run once before all tests");
})

beforeEach(() => {
    console.log("I'm running before each test");
});

afterEach(() => {
    console.log("I'm running after each test");
    input.value = '';
    usernames = [];
});

afterAll(() => {
    console.log("I run once after all tests");
})