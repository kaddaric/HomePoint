const express = require('express');
const connection = require('../../helpers/db');
const router = express.Router();

// Get all clients
router.get('/', function(req, res, next) {
  connection.query('SELECT client_id AS id, name, street_num, street_name, postal_code, city FROM Clients;', function(error, results, fields) {
    if (error) {console.log("error : ", error)}
    else {      
      res.send(results); 
    }   
  });
});

// Add a client
router.post('/add', function (req, res, next) {
  connection.query('INSERT INTO Clients SET ?', req.body.dataForm, function (error, results, fields) {
    if (error) {
      console.log("error : ", error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  });
})

// Modify a client
router.put('/modify', function (req, res, next) {  
  connection.query(`UPDATE Clients SET name = ('${req.body.dataForm.name}'), street_num = ('${req.body.dataForm.street_num}'), street_name = ('${req.body.dataForm.street_name}'), postal_code = ('${req.body.dataForm.postal_code}'), city = ('${req.body.dataForm.city}') WHERE client_id = ${req.body.dataForm.client_id};`, function (error, results, fields) {
    if (error) {
      console.log("error : ", error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  });
})
// Delete a client
router.put('/', function (req, res, next) {
  connection.query(`DELETE FROM Clients WHERE client_id='${req.body.client_id}'`, function (error, results, fields) {
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