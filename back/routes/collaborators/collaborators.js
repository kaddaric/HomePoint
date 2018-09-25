const express = require('express');
const connection = require('../../helpers/db');
const router = express.Router();

// Initialize data
router.get('/', function (req, res, next) {
  connection.query('SELECT c.collaborateur_id AS id, \
    firstname, lastname, \
    phone, mail, end_of_mission, \
    street_num, street_name, postal_code, city, \
    latitude, longitude, transport, \
    GROUP_CONCAT(skill) AS skills \
    FROM Collaborateurs c INNER JOIN Has_skills hs \
    ON hs.collaborateur_id = c.collaborateur_id \
    INNER JOIN Skills s ON hs.skill_id = s.skill_id \
    GROUP BY c.collaborateur_id;',
    function (error, results, fields) {
      if (error) { console.log("error : ", error) }
      else {
        res.send(results);
      }
    });
});

// Add a collaborator
router.post('/add', function (req, res, next) {
  connection.query('INSERT INTO Collaborateurs SET ?', req.body.dataForm, function (error, results, fields) {
    if (error) {
      console.log("error : ", error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  });
})

// Modify a collaborator
router.put('/modify', function (req, res, next) {
  connection.query(`UPDATE Collaborateurs SET firstname = ('${req.body.dataForm.firstname}'), \
                    lastname = ('${req.body.dataForm.lastname}'), \
                    phone = ('${req.body.dataForm.phone}'), \
                    mail = ('${req.body.dataForm.mail}'), \
                    end_of_mission = ('${req.body.dataForm.end_of_mission}'), \
                    street_num = ('${req.body.dataForm.street_num}'), \
                    street_name = ('${req.body.dataForm.street_name}'), \
                    postal_code = ('${req.body.dataForm.postal_code}'), \
                    city = ('${req.body.dataForm.city}'), \
                    latitude = ('${req.body.dataForm.latitude}'), \
                    longitude = ('${req.body.dataForm.longitude}'), \
                    transport = ('${req.body.dataForm.transport}') \
                    WHERE collaborateur_id = ${req.body.dataForm.collaborateur_id};`,
    function (error, results, fields) {
      if (error) {
        console.log("error : ", error);
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200);
      }
    });
})

// Delete old skills from Has_skill dabatase after modification
router.put('/deletecurrentskills', function (req, res, next) {
  connection.query(`DELETE FROM Has_skills WHERE collaborateur_id='${req.body.collaborateur_id}'`,
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

// Add new skills to Has_skill database after modification
router.post('/addnewskills', function (req, res, next) {
  connection.query(`INSERT INTO Has_skills (skill_id, collaborateur_id) VALUES ('${req.body.skillInput.skill}', ${req.body.skillInput.collaborateur_id})`, function (error, results, fields) {
    if (error) {
      console.log("error : ", error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  })
})

// Delete a collaborator
router.put('/delete', function (req, res, next) {
  connection.query(`DELETE FROM Collaborateurs WHERE collaborateur_id='${req.body.collaborateur_id}';
                    DELETE FROM Has_skills WHERE collaborateur_id='${req.body.collaborateur_id}'`,
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

// Add skills to a collaborator
router.post('/addskills', function (req, res, next) {
  connection.query(`INSERT INTO Has_skills (skill_id, collaborateur_id) VALUES ('${req.body.skill}', (SELECT MAX(collaborateur_id) FROM Collaborateurs))`, function (error, results, fields) {
    if (error) {
      console.log("error : ", error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  })
})

module.exports = router;