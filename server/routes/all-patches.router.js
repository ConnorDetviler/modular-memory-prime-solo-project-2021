const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for all data of all of current user's patches
 */
router.get('/', (req, res) => {

    const queryText = `
        SELECT "patch".id, "patch".title FROM "patch";
    `;

    pool
    .query(queryText)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.error("Error completing SELECT patch names query", err);
        res.sendStatus(500)
    })});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
