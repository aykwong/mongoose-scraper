var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: { type: String, trim: true, default: 'Lorem Ipsum' },
    link: { type: String, required: true },
    body: { type: String, default: 'Lorem Ipsum' },
    saved: { type: Boolean },
    note: { type: Schema.Types.ObjectId, ref:"Note"}
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;