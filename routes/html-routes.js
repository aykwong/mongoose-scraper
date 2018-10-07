var db = require("../models");


module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                var hbObj = {
                    articles: dbArticle
                }
                res.render("index", hbObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/saved", function (req, res) {
        db.Article.find({
            saved: true
        }).then(function (dbSaved) {
                var hbObj = {
                    save: dbSaved
                }
                res.render("saved", hbObj);
            })
            .catch(function (err) {
                res.json(err);
            });
    })
};