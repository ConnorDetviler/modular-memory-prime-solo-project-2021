const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const patch = req.body;
    console.log('patch.router:', patch);

    const query = `
        INSERT INTO "patch" ("title", "patch_notes", "patch_image", "user_id")
        VALUES ($1, $2, $3, $4);
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