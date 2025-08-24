const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    orderIndex: { type: Number, required: true },
    theory: { type: String },
});

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;
