const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    title: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
