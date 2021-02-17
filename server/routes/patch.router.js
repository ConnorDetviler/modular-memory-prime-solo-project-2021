const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route for editing patch
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route for creating patch
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const patch = req.body;
    id = req.user.id;
    console.log('patch.router POST', patch);

    const query = `
        INSERT INTO "patch" ("title", "patch_notes", "patch_image", "user_id", "date_created")
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING "patch".id;
    `;

    pool.query(query, [patch.title, patch.patch_notes, patch.patch_image, id])
    .then(result => {
        console.log(result)
        console.log('returning new id:', result.rows[0].id)
        res.send({newPatchID: result.rows[0].id});
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
});

/**
 * PUT route for editing patch
 */
router.put('/', rejectUnauthenticated, (req, res) => {
    const patch = req.body;
    console.log('patch.router PUT', patch)
    let id = req.user.id;

    const query = `
    UPDATE "patch"
    SET "title" = $1,
	    "patch_notes" = $2,
	    "patch_image" = $3
    WHERE "patch".id = $4 AND "patch".user_id = $5;
    `;

    pool.query(query, [patch.title, patch.patch_notes, patch.patch_image, patch.patch_id, id])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
});

/**
 * DELETE route for deleting patch
 */
router.delete('/', rejectUnauthenticated, (req, res) => {
    const patch = req.body;
    console.log('patch.router DELETE', patch)
    id = req.user.id;

    const query = `
        DELETE FROM "patch"
        WHERE "id" = $1 AND "user_id" = $2;
    `;

    pool.query(query, [patch.id, id])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;