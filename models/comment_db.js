var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: { type: String, trim: true, default: 'Lorem Ipsum' },
    body: { type: String, default: 'Lorem Ipsum' }
});

var Note = mongoose.model("Note_db", NoteSchema);

module.exports = Note;