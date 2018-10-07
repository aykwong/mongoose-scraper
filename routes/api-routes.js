var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {
  app.get('/remove', function (req, res) {
    db.Article.deleteMany(function (err, result) {
      if (err) throw err;
      if (result) console.log("Collection deleted");
    });
    request("http://forums.redflagdeals.com/hot-deals-f9/", function (err, response, html) {

      var $ = cheerio.load(response.body);

      var result = {};

      $(".topic h3").each(function (i, element) {

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(element).find(".topic_title_link").text();
        result.body = $(element).find(".topictitle_retailer").text();
        result.link = `https://forums.redflagdeals.com${$(element).find(".topic_title_link").attr("href")}`;

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

  app.post("/Articles/unsave/:id", function (req, res) {
    db.Article.updateOne(
      { _id: req.params.id },
      { $set: { saved: false } }
    ).then(function (dbArticle) {
      console.log(dbArticle);
      res.send(true);
    })
      .catch(function (err) {
        console.log(dbArticle)
        res.json(err);
      });
  });

  app.get("/Notes/:id", function (req, res) {
    db.Note.find({ articleId: req.params.id }).limit(1).sort({ $natural: -1 })
      .then(function (dbNote) {
        res.json(dbNote);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post("/Notes", function (req, res) {
    let result = {};

    result.articleId = req.body.articleId;
    result.message = req.body.message;

    db.Note.create(result)
      .then(function (dbNote) {
        console.log(dbNote);
        console.log('Note Saved!');
        res.json(true);
      })
      .catch(function (err) {
        return res.json(err);
      });
  });
};
