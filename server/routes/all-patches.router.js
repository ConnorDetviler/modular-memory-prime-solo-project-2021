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
        const patchesArr = result.rows;

        // second query for getting all associated tags for each patch
        const tagQueryText = `
            SELECT "tag".id, "tag".name FROM "patch_tag"
            JOIN "tag" ON "patch_tag".tag_id = "tag".id
            WHERE "patch_id" = $1;
        `;

        function sendData(dataToSend) {
            // console.log(dataToSend)
            res.send(dataToSend)
        }
        function getTags(i) {
            pool
            .query(tagQueryText, [patchesArr[i].id])
            .then((result) => {
                patchesArr[i].tags = result.rows
    
                // when loop is finished:
                if (i === patchesArr.length - 1) {
                    sendData(patchesArr)
                }
            })
            .catch((err) => {
                console.log(`Error completing SELECT in tag query within all-patches`, err)
            })
        }

        // does a query for each patch in the result.rows from last query to get it's tags
        for (let i = 0; i < patchesArr.length; i++) {
            getTags(i)
        }
    })
    .catch((err) => {
        console.error("Error completing SELECT all patches query", err);
        res.sendStatus(500)
    })
});

module.exports = router;
