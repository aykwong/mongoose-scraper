var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {
  app.get('/remove', function (req, res) {
    db.Article.deleteMany(function (err, result) {
      if (err) throw err;
      if (result) console.log("Collection deleted");
    });
    request("http://www.echojs.com/", function (err, response, html) {

      var $ = cheerio.load(response.body);

      var result = {};

      $("article h2").each(function (i, element) {

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(element).children("a").text();
        result.link = $(element).children("a").attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {

          })
          .catch(function (err) {
            return res.json(err);
          });
      });

      console.log("Scraping complete!");
      res.json(true);
    });
  });

  app.post("/Articles/:id", function (req, res) {
    db.Article.updateOne(
      { _id: req.params.id },
      { $set: { saved: true } }
    ).then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      console.log(dbArticle);
      res.send(true);
    })
      .catch(function (err) {
        console.log(dbArticle)
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/Notes/:id", function (req, res) {
    db.Note.findOne({ id: req.params.id })
      .then(function (dbNote) {
        // If we were able to successfully find Articles, send them back to the client
        console.log(dbNote);
        res.json(dbNote);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.post("/Notes/", function (req, res) {
    db.Note.deleteOne({ id: req.body.id })
      .then(function (err, result) {
        if (result) console.log("Collection deleted");
      })
      .catch(function (err) {
        console.log("Delete error, " + err);
      })

    var result = {};
    result.title = req.body.title;
    result.body = req.body.body;
    result.id = req.body.id;

    db.Note.create(result)
      .then(function (dbNote) {
        console.log("created, " + dbNote);
        res.send(true);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.send(false);
        return (err);
      });
  });
};