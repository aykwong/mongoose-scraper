var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const NoteSchema = new Schema({
    articleId: { type: String },
    message: { type: String }
});

var Note = mongoose.model("Note_db", NoteSchema);

module.exports = Note;