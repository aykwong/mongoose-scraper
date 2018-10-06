var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: { type: String },
    body: { type: String },
    id: { type: String }
});

var Note = mongoose.model("Note_db", NoteSchema);

module.exports = Note;