const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    title: { type: String, required: true },
    instruction: { type: String, required: true },
    starterCode: { type: String, required: true },
    testFile: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
