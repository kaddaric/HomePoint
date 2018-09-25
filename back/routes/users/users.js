const express = require('express');
const connection = require('../../helpers/db');
const router = express.Router();

router.get('/', function(req, res, next) {
  connection.query('SELECT user_id AS id, firstname, lastname, phone, mail, administrator, password FROM Utilisateurs;', function(error, results, fields) {
    if (error) {console.log("error : ", error)}
    else {      
      res.send(results); 
    }   
  });
});

router.post('/add', function (req, res, next) {
  connection.query('INSERT INTO Utilisateurs SET ?', req.body.dataForm, function (error, results, fields) {
    if (error) {
      console.log("error : ", error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  });
})

// Modify a user
router.put('/modify', function (req, res, next) {
  connection.query(`UPDATE Utilisateurs SET firstname = ('${req.body.dataForm.firstname}'), lastname = ('${req.body.dataForm.lastname}'), phone = ('${req.body.dataForm.phone}'), mail = ('${req.body.dataForm.mail}'), administrator = ('${req.body.dataForm.administrator}'), password = ('${req.body.dataForm.password}') WHERE user_id = ${req.body.dataForm.user_id};`, function (error, results, fields) {
    if (error) {
      console.log("error : ", error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  });
})

// Delete a user
router.put('/', function (req, res, next) {
  connection.query(`DELETE FROM Utilisateurs WHERE user_id='${req.body.user_id}'`, function (error, results, fields) {
    if (error) {
       console.log("error : ", error);
       res.sendStatus(500);
      }
    else {
      console.log("user deleted");
      
      res.sendStatus(200)
    }
  });
})

module.exports = router;