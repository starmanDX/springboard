const rollDice = require('./dice');

describe('#rollDice', () => {
    test('it rolls the correct amount of dice', () => {
        // Mock out Math.random to always equate to .5
        Math.random = jest.fn(() => 0.5)
        expect(rollDice(6)).toEqual(3);
        expect(rollDice(2)).toEqual(1);
        expect(Math.random).toHaveBeenCalled();
        // Checks that function was called exactly two times
        expect(Math.random.mock.calls.length).toBe(2)
    });
});


// Example of a mock axios test

// users.tests.js
// import axios from 'axios';
// import Users from './users';

// jest.mock('axios');

// test('should fetch users', () => {
//     const users = [{ name: "Bob" }];
//     const resp = { data: users };
//     axios.get.mockResolvedValue(resp);

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation() => Promise.resolve(resp))

//     return Users.all().then(data => expect(data).toEqual(users));
// });