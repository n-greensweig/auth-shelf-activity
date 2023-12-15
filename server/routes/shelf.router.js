const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {

  console.log(req.body);
  
  // endpoint functionality
  let queryText = `
  INSERT INTO "item" ("description", "image_url", "user_id")
  VALUES ($1, $2, $3);
  `;
  pool.query(queryText, [req.body.description, req.body.image_url, req.params.user])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.error('Error in the POST request:', error);
    res.sendStatus(500);
  })

});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
