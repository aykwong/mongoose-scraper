var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {
  app.get('/scrape', function (req, res) {
    request("http://www.echojs.com/", function (err, response, html) {

      var $ = cheerio.load(response.body);

      var result = {};

      $("article h2").each(function (i, element) {

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(element).children("a").text();
        result.link = $(element).children("a").attr("href");

        console.log(result);

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            console.log(dbArticle);
          })
          .catch(function (err) {
            return res.json(err);
          });
      });
      console.log("Scraping complete!");
    });
  });

  app.get('/newArticles', function (req, res) {
    // Save a new entry using the data object
    db.Article.find({})
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};

app.get("/Articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/Articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});