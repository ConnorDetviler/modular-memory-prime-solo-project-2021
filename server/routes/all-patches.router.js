const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for all data of all of current user's patches
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
    const connection = await pool.connect();
    try {
        connection.query('BEGIN;');

        const patchQuery = `
            SELECT * FROM "patch"
            WHERE "patch".user_id = $1;
        `;

        const tagQuery = `
            SELECT "tag".id, "tag".name FROM "patch_tag"
            JOIN "tag" ON "patch_tag".tag_id = "tag".id
            WHERE "patch_id" = $1;
        `;

        const patches = (await connection.query(patchQuery, [req.user.id])).rows;

        for (let i = 0; i < patches.length; i++) {
            patches[i].tags = (await connection.query(tagQuery, [patches[i].id])).rows;
        }
        console.log(patches);

        connection.query('COMMIT;');
        res.send(patches)

    } catch (err) {
        console.log('Error in GET transaction in all-patches.router. rollback: ', err)
        await connection.query('ROLLBACK;');
        res.sendStatus(500);
    } finally {
        connection.release();
    }
})

module.exports = router;
