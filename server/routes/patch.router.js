const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for editing patch
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route for creating patch
 */
router.post('/', (req, res) => {
    const patch = req.body;
    console.log('patch.router POST', patch);

    const query = `
        INSERT INTO "patch" ("title", "patch_notes", "patch_image", "user_id", "date_created")
        VALUES ($1, $2, $3, $4, NOW());
    `;

    pool.query(query, [patch.title, patch.patch_notes, patch.patch_image, patch.user_id])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
});

/**
 * PUT route for editing patch
 */
router.put('/', (req, res) => {
    const patch = req.body;
    console.log('patch.router PUT', patch)

    const query = `
    UPDATE "patch"
    SET "title" = $1,
	    "patch_notes" = $2,
	    "patch_image" = $3
    WHERE "patch".id = $4;
    `;

    pool.query(query, [patch.title, patch.patch_notes, patch.patch_image, patch.patch_id])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
})

/**
 * DELETE route for deleting patch
 */
router.delete('/', (req, res) => {
    const patch = req.body;
    console.log('patch.router DELETE', patch)

    const query = `
        DELETE FROM "patch"
        WHERE "id" = $1 AND "user_id" = $2;
    `;

    pool.query(query, [patch.id, patch.userID])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;