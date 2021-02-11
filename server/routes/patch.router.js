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
    console.log('patch.router:', patch);

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

module.exports = router;