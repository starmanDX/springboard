/** Routes for users of pg-relationships-demo. */

const db = require("../db");
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");



/** Get users: [user, user, user] */
router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(
      `SELECT id, name, type FROM users`);

    return res.json(results.rows);
  }

  catch (err) {
    return next(err);
  }
});

/** Get user: {name, type, messages: [{msg, msg}]} */
router.get('/:id', async (req, res, next) => {
  const {id} = req.params
  try {
    const userResults = await db.query(`SELECT name, type FROM users WHERE id = $1`, [id])
    const messageResults = await db.query(`SELECT id, msg FROM messages WHERE user_id=$1`, [id])
    if (userResults.rows.length === 0) {
      throw new ExpressError(`Cannot find user with id of ${req.params.id}`, 404)
    }
    const user = userResults.rows[0];
    user.messages = messageResults.rows;
    return res.send(user)
  } catch (e) {
    return next(e);
  }
})

module.exports = router;