const express = require('express');
const connection = require('../../helpers/db');
const router = express.Router();

// Get all skills
router.get('/', function (req, res, next) {
  connection.query('SELECT skill_id AS id, skill FROM Skills;', function (error, results, fields) {
    if (error) { console.log("error : ", error) }
    else {
      res.send(results);
    }
  });
});

// Insert new skill
router.post('/', function (req, res, next) {
  connection.query('INSERT INTO Skills SET ?', req.body, function (error, results, fields) {
    if (error) {
      console.log("error : ", error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  });
})

// Delete skill in Skills db and Has_skills db
router.put('/', function (req, res, next) {
  connection.query(`DELETE FROM Skills WHERE skill_id='${req.body.skill_id}';
                    DELETE FROM Has_skills WHERE skill_id='${req.body.skill_id}'`,
    function (error, results, fields) {
      if (error) {
        console.log("error : ", error);
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200)
      }
    });
})

module.exports = router;