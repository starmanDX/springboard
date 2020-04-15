process.env.NODE_ENV = 'test';

const request = require('supertest')
const app = require('../app');
const db = require('../db');

let testCompany;
beforeEach(async () => {
    const result = await db.query(`INSERT INTO companies (code, name, description) VALUES ('goog', 'Google', 'We run the world!') RETURNING *`);
    testCompany = result.rows[0]
})

afterEach(async () => {
    await db.query('DELETE FROM companies');
})

afterAll(async () => {
    await db.end()
})

describe('GET /companies', () => {
    test('Get a list with one company', async() => {
        const res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ companies: [testCompany] })
    })
})

describe('POST /companies', () => {
    test('Creates a single company', async () => {
        const res = await request(app).post('/companies').send({ code: 'test', name: 'Test Company', description: 'This is a test company.' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            'added company': {
                code: 'test',
                name: 'Test Company',
                description: 'This is a test company.'}
        })
    })
})

describe('PATCH /companies/:code', () => {
    test('Updates a single company', async () => {
        const res = await request(app).patch(`/companies/${testCompany.code}`).send({ code: 'test2', name: 'Test Company 2', description: 'This is an updated test company.' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            'updated company': {
                code: 'test2',
                name: 'Test Company 2',
                description: 'This is an updated test company.'
                }
        })
    })
    test('Responds with 404 for invalid company code', async () => {
        const res = await request(app).patch(`/companies/invalid`).send({});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            error: {
                message: "Can't update company with code of invalid",
                status: 404
            }
        })
    })
})

describe('DELETE /companies/:code', () => {
    test('Deletes a single company', async () => {
        const res = await request(app).delete(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            status: 'Company deleted.'
        })
    })
    test('Responds with 404 for invalid company code', async () => {
        const res = await request(app).delete(`/companies/invalid`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            error: {
                message: "Can't delete company with code of invalid",
                status: 404
            }
        })
    })
})

describe('GET /companies/:code', () => {
    test('Get a single company', async() => {
        const res = await request(app).get(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ company: {code: 'goog', name: 'Google', description: 'We run the world!', invoices: []} })
    })
    test('Responds with 404 for invalid company code', async() => {
        const res = await request(app).get(`/companies/invalid`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            error: {
                message: "Can't find company with code of invalid",
                status: 404
            }
        })
    })
})