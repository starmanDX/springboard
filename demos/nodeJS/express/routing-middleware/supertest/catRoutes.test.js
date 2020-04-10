process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');

let cats = require('./fakeDb')
let pickles = { name: 'Pickles' };


beforeEach(() => {
    cats.push(pickles);
});

afterEach(() => {
    // makes sure this *mutates*, not redefines, 'cats'
    cats.length = 0;
});

describe("/GET /cats", () => {
    test("Get all cats", async () => {
        const res = await request(app).get('/cats');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cats: [pickles]})
    })
})

describe("/GET /cats/:name", () => {
    test("Get cat by name", async () => {
        const res = await request(app).get(`/cats/${pickles.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cat: pickles})
    })
    test("Trying to get an invalid cat", async () => {
        const res = await request(app).get(`/cats/testCat`);
        expect(res.statusCode).toBe(404);
    })
})

describe("/POST /cats", () => {
    test("Creating a cat", async () => {
        const res = await request(app).post('/cats').send({name: "Blue"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ cat: { name: "Blue" } });
        // run node --inspect(-brk w/o debugger line) $(which jest) --runInBand catRoutes.test.js to run debugger on test file
        // debugger;
    })
    test("Trying to create an invalid cat", async () => {
        const res = await request(app).post('/cats').send({});
        expect(res.statusCode).toBe(400);
    })
})

describe("/PATCH /cats/:name", () => {
    test("Updating a cat", async () => {
        const res = await request(app).patch(`/cats/${pickles.name}`).send({name: "Monster"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cat: { name: "Monster" } });
    })
    test("Trying to update an invalid cat", async () => {
        const res = await request(app).patch(`/cats/testCat`).send({name: "Monster"});
        expect(res.statusCode).toBe(404);
    })
})

describe("/DELETE /cats/:name", () => {
    test("Deleting a cat", async () => {
        const res = await request(app).delete(`/cats/${pickles.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted.'})
    })
    test("Trying to delete an invalid cat", async () => {
        const res = await request(app).delete(`/cats/testCat`);
        expect(res.statusCode).toBe(404);
    })
})