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
        const cResults = await db.query('SELECT * FROM companies WHERE code=$1', [code]);
        const iResults = await db.query('SELECT * FROM invoices WHERE comp_code=$1', [code])
        if (cResults.rows.length === 0) {
            throw new ExpressError(`Can't find company with code of ${code}`, 404)
        }
        const company = cResults.rows[0];
        const invoices = iResults.rows;

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