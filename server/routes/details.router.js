const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {

    let id = Number(req.params.id)

    const queryText = `
        SELECT * FROM "patch"
        WHERE "patch".id = $1;
    `;

    pool
    .query(queryText, [id])
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