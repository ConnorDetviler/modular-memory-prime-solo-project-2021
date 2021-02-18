const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {

    // let id = Number(req.params.id);
    let id = req.user.id;
    console.log('user id:', id)

    const queryText = `
        SELECT "patch".id, "patch".title FROM "patch"
        WHERE "patch".user_id = $1;
    `;

    pool
    .query(queryText, [id])
    .then((result) => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.error("Error completing SELECT patch names query", err);
        res.sendStatus(500)
    })
});



module.exports = router;