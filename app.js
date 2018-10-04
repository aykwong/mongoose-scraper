var express = require('express');
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require('path');
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// mongoose connect
mongoose.connect("mongodb://localhost/mongooseScraper", { useNewUrlParser: true });

var app = express();
var PORT = process.env.PORT || 8080;

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));

require("./routes/index.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on http://localhost:" + PORT + "!");
});
