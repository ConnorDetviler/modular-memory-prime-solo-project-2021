const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {

    let id = Number(req.params.id)
    console.log('req.user', req.user)

    // first query gets details for one patch
    const patchQueryText = `
        SELECT * FROM "patch"
        WHERE "patch".id = $1 AND "patch".user_id = $2;
    `;

    pool
    .query(patchQueryText, [id, req.user.id])
    .then((patchResult) => {

        // second query gets details for each tag associated with that patch
        const tagQueryText = `
            SELECT "tag".id, "tag".name, "tag".color FROM "tag"
            JOIN "patch_tag" ON "tag".id = "patch_tag".tag_id
            WHERE "patch_tag".patch_id = $1 AND "tag".user_id = $2;
        `;

        pool
        .query(tagQueryText, [id, req.user.id])
        .then((tagResult) => {

            // patch object combines result of both queries into one object
            const patchObject = {
                ...patchResult.rows[0],
                tags: tagResult.rows
            }

            console.log(patchObject)
            res.send(patchObject)

        })
    })
    .catch((err) => {
        console.error("Error completing SELECT details query", err);
        res.sendStatus(500)
    })
});


module.exports = router;