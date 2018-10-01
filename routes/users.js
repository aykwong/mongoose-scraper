var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/newArticle', function (req, res) {
  // Save a new entry using the data object
  db.create(req.body)
    .then(function (data) {
      // If saved successfully, print the new entry document to the console
      console.log(data);
    })
    .catch(function (err) {
      // If an error occurs, log the error message
      console.log(err.message);
    });
});

module.exports = router;
