const express = require('express');
const connection = require('../../helpers/db');
const router = express.Router();

router.get('/', function(req, res, next) {
  connection.query('SELECT c.collaborateur_id AS id, \
    firstname, lastname, end_of_mission, latitude, longitude, transport, \
    GROUP_CONCAT(skill) AS skills \
    FROM Collaborateurs c INNER JOIN Has_skills hs \
    ON hs.collaborateur_id = c.collaborateur_id \
    INNER JOIN Skills s ON hs.skill_id = s.skill_id \
    GROUP BY c.collaborateur_id;', 
    function(error, results, fields) {
    if (error) {console.log("error : ", error)}
    else res.send(results);
  });
});


module.exports = router;