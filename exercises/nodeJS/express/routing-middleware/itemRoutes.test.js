process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');

let items = require('./fakeDb')
let pickles = { name: 'pickles', price: 1.45 };


beforeEach(() => {
    items.push(pickles);
});

afterEach(() => {
    // makes sure this *mutates*, not redefines, 'items'
    items.length = 0;
});

describe("/GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [pickles]})
    })
})

describe("/GET /items/:name", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${pickles.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: pickles})
    })
    test("Trying to get an invalid item", async () => {
        const res = await request(app).get(`/items/testItem`);
        expect(res.statusCode).toBe(404);
    })
})

describe("/POST /item", () => {
    test("Creating an item", async () => {
        const res = await request(app).post('/items').send({name: "popsicle", price: .99});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: { name: "popsicle", price: .99 } });
        // run node --inspect(-brk w/o debugger line) $(which jest) --runInBand itemRoutes.test.js to run debugger on test file
        // debugger;
    })
    test("Trying to create an invalid item", async () => {
        const res = await request(app).post('/items').send({});
        expect(res.statusCode).toBe(400);
    })
})

describe("/PATCH /items/:name", () => {
    test("Updating an item", async () => {
        const res = await request(app).patch(`/items/${pickles.name}`).send({name: "Mustard", price: 1.99});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "Mustard", price: 1.99 } });
    })
    test("Trying to update an invalid item", async () => {
        const res = await request(app).patch(`/items/testItem`).send({name: "Red Bull", price: 4.99});
        expect(res.statusCode).toBe(404);
    })
})

describe("/DELETE /items/:name", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete(`/items/${pickles.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted'})
    })
    test("Trying to delete an invalid item", async () => {
        const res = await request(app).delete(`/items/testItem`);
        expect(res.statusCode).toBe(404);
    })
})