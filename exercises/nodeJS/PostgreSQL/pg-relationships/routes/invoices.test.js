process.env.NODE_ENV = 'test';

const request = require('supertest')
const app = require('../app');
const db = require('../db');

let testCompany;
let testInvoice
beforeEach(async () => {
    const cResult = await db.query(`INSERT INTO companies (code, name, description) VALUES ('test', 'Test', 'We run the world!') RETURNING *`);
    const iResult = await db.query(`INSERT INTO invoices (comp_Code, amt, paid, paid_date) VALUES ('test', 100, false, null) RETURNING *`);
    testCompany = cResult.rows[0];
    testInvoice = iResult.rows[0];
})

afterEach(async () => {
    await db.query('DELETE FROM companies');
    await db.query('DELETE FROM invoices');
})

afterAll(async () => {
    await db.end()
})

describe('GET /invoices', () => {
    test('Get a list with one invoice', async() => {
        const res = await request(app).get('/invoices');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            invoices: [{
                "id": expect.any(Number),
                "comp_code": "test",
                "amt": 100,
                "paid": false,
                "add_date": expect.any(String),
                "paid_date": null
            }]
        })
    })
})

describe('POST /invoices', () => {
    test('Creates a single invoice', async () => {
        const res = await request(app).post('/invoices').send({ comp_code: 'test', amt: 333 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            'added invoice': {
                id: expect.any(Number),
                add_date: expect.any(String),
                amt: 333,
                comp_code: 'test',
                paid: false,
                paid_date: null,
            }
        })
    })
})

describe('PATCH /invoices/:id', () => {
    test('Updates a single invoice', async () => {
        const res = await request(app).patch(`/invoices/${testInvoice.id}`).send({ amt: 999 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            'updated invoice': {
                id: expect.any(Number),
                add_date: expect.any(String),
                amt: 999,
                comp_code: 'test',
                paid: false,
                paid_date: null,
            }
        })
    })
    test('Responds with 404 for invalid invoice id', async () => {
        const res = await request(app).patch(`/invoices/0`).send({});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            error: {
                message: "Can't update invoice with id of 0",
                status: 404
            }
        })
    })
})

describe('DELETE /invoices/:id', () => {
    test('Deletes a single invoice', async () => {
        const res = await request(app).delete(`/invoices/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            status: 'Invoice deleted.'
        })
    })
    test('Responds with 404 for invalid invoice id', async () => {
        const res = await request(app).delete(`/invoices/0`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            error: {
                message: "Can't delete invoice with id of 0",
                status: 404
            }
        })
    })
})

describe('GET /invoice/:id', () => {
    test('Get a single invoice', async() => {
        const res = await request(app).get(`/invoices/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            invoice: {
                "id": expect.any(Number),
                "comp_code": "test",
                "amt": 100,
                "paid": false,
                "add_date": expect.any(String),
                "paid_date": null
            }
        })
    })
    test('Responds with 404 for invalid invoice id', async() => {
        const res = await request(app).get(`/invoices/0`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            error: {
                message: "Can't find invoice with id of 0",
                status: 404
            }
        })
    })
})