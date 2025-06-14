const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    author: { type: String, required: true }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
