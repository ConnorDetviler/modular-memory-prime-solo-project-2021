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
    userID = req.user.id;
    console.log('patch.router POST', patch);

    const patchQuery = `
        INSERT INTO "patch" ("title", "patch_notes", "patch_image", "user_id", "date_created")
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING "patch".id;
    `;

    pool.query(patchQuery, [patch.title, patch.patch_notes, patch.patch_image, userID])
    .then(result => {
        console.log(result)
        console.log('returning new id:', result.rows[0].id)
        res.send({newPatchID: result.rows[0].id});


        // second query for entering patch_tag associations
        // tagArray is given just ID numbers of each selected tag
        let tagArray = [];
        for (let i = 0; i < patch.tags.length; i++) {
            const tagObject = patch.tags[i];
            if (tagObject.selected) {
                tagArray.push(tagObject.id)
            }
        }
        // conditional checks if there are any tag associations to be made
        if (tagArray[0] !== undefined) {
            // queryValues generates the VALUES portion of the query
            let queryValues = '';
            // poolArray references the $x values within the queryValues
            let poolArray = [result.rows[0].id];

            for (let i = 0; i < tagArray.length; i++) {
                queryValues = queryValues.concat(`, ($1, $${i+2})`)
                poolArray.push(tagArray[i])
            }
            queryValues = queryValues.substring(2)
            // console.log('queryValues', queryValues);
            // console.log('poolArray', poolArray);

            const tagQuery = `
                INSERT INTO "patch_tag" ("patch_id", "tag_id")
                VALUES ${queryValues};
            `;

            // console.log('tagQuery', tagQuery);

            pool.query(tagQuery, poolArray)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
        }
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