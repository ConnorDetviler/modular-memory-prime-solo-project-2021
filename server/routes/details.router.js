const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {

    let id = Number(req.params.id)
    console.log('req.user', req.user)

    const queryText = `
        SELECT * FROM "patch"
        WHERE "patch".id = $1 AND "patch".user_id = $2;
    `;

    pool
    .query(queryText, [id, req.user.id])
    .then((result) => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.error("Error completing SELECT details query", err);
        res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;