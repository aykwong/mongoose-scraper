var mongoose = require("mongoose");

var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ArticleSchema = new Schema({
    author: ObjectId,
    title: { type: String, trim: true, default: 'Lorem Ipsum' },
    body: { type: String, default: 'Lorem Ipsum' },
    date: Date
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;