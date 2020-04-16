const express = require('express');
const ExpressError = require('../expressError')
const router = express.Router();
const db = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM companies');
        return res.json({
            companies: results.rows
        });
    } catch (e) {
        return next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {
            code,
            name,
            description
        } = req.body;
        if (code === undefined) {
            throw new ExpressError('Must enter a company code', 400)
        }
        if (name === undefined) {
            throw new ExpressError('Must enter a company name', 400)
        }
        const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *', [code, name, description]);
        return res.status(201).json({
            'added company': results.rows[0]
        })
    } catch (e) {
        return next(e);
    }
})

router.get('/:code', async (req, res, next) => {
    try {
        const {
            code
        } = req.params;
        const companyResults = await db.query('SELECT * FROM companies JOIN invoices ON companies.code = invoices.comp_code WHERE code=$1', [code]);
        const invoiceResults = await db.query('SELECT * FROM invoices WHERE comp_code=$1', [code])
        if (companyResults.rows.length === 0) {
            throw new ExpressError(`Can't find company with code of ${code}`, 404)
        }
        const company = companyResults.rows[0];
        const invoices = invoiceResults.rows;

        company.invoices = invoices.map(i => i);

        return res.send({
            company: company
        })
    } catch (e) {
        return next(e);
    }
})

router.patch('/:code', async (req, res, next) => {
    try {
        const {
            code
        } = req.params;
        const {
            name,
            description
        } = req.body;
        const new_code = req.body.code;
        const results = await db.query('UPDATE companies SET code=$1, name=$2, description=$3 WHERE code=$4 RETURNING code, name, description', [new_code, name, description, code]);
        if (results.rows.length === 0) {
            throw new ExpressError(`Can't update company with code of ${code}`, 404)
        }
        return res.send({
            'updated company': results.rows[0]
        })
    } catch (e) {
        return next(e);
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        const {
            code
        } = req.params;
        const results = await db.query('DELETE FROM companies WHERE code = $1', [code])
        if (results.rowCount === 0) {
            throw new ExpressError(`Can't delete company with code of ${code}`, 404)
        }
        return res.send({
            status: 'Company deleted.'
        })
    } catch (e) {
        return next(e);
    }
})

module.exports = router;