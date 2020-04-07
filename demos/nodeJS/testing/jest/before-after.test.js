const {
    getCartTotal
} = require('./before-after');

// runs before all tests begin
beforeAll(() => {
    console.log('BEFORE ALL')
})
// runs before every test
beforeEach(() => {
    console.log('BEFORE EACH')
})
// runs after every test
afterEach(() => {
    console.log('AFTER EACH')
})
// runs after all tests complete
afterAll(() => {
    console.log('AFTER ALL')
})

describe('getCartTotal', () => {
    let cart;
    //runs before all tests in the describe begin
    beforeAll(() => {
        console.log('BEFORE ALL IN DESCRIBE')
    })
    // runs before each test in the describe
    beforeEach(() => {
        console.log('BEFORE EACH IN DESCRIBE');
        cart = [{
               item: 'le croix',
               price: 4.99,
               qty: 3
           },
           {
               item: 'pretzels',
               price: 8.99,
               qty: 10
           }
       ];
    })
    // runs after each test in the describe
    afterEach(() => {
        console.log('AFTER EACH IN DESCRIBE');
    })
    // runs after all tests in the describe complete
    afterAll(() => {
        console.log('AFTER ALL IN DESCRIBE')
    })
    
    test('get total w/o discount', () => {
        const total = getCartTotal(cart);
        expect(total).toBe(104.87);
    })
    test('get total w/ discount', () => {
        const total = getCartTotal(cart, 0.5);
        expect(total).toBe(52.44);
    })
});