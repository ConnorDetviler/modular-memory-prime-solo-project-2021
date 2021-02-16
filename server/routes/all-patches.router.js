const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for all data of all of current user's patches
 */
router.get('/', rejectUnauthenticated, (req, res) => {

    let id = req.user.id;
    console.log('in all-patches.router - user id:', id)

    const queryText = `
        SELECT * FROM "patch"
        WHERE "patch".user_id = $1;
    `;

    pool
    .query(queryText, [id])
    .then((result) => {
        res.send(result.rows)
        // console.log(result.rows)
    })
    .catch((err) => {
        console.error("Error completing SELECT all patches query", err);
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
