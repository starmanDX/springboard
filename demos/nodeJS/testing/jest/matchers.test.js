describe('test matchers', () => {
    test('compare toBe and toEqual', () => {
        const nums = [3, 4, 5];
        const copy = [...nums];

        expect(copy).toEqual(nums);
    })
    test('testing toContain matcher', () => {
        const colors = ['red', 'green', 'blue']

        expect(colors).toContain('red');
        expect('hello').toContain('hell');
    })
    test('testing numeric matchers', () => {
        expect(7).toBeGreaterThanOrEqual(2);
        expect(2).toBeGreaterThanOrEqual(2);
    })
    test('testing boolean matchers', () => {
        expect('hi').toBeTruthy();
        expect('').toBeFalsy();
    })
    test('testing "any" matcher', () => {
        const randNum = Math.random() * 6;
        expect(randNum).toEqual(expect.any(Number));
        expect("test").toEqual(expect.any(String));
    })
    test('testing "not" matcher', () => {
        const numLives = 9;
        expect(numLives).not.toEqual(0);
        expect(numLives).not.toEqual(expect.any(Array))
    })
})