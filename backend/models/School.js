const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { versionKey: false });

const School = mongoose.model('School', schoolSchema);

module.exports = School;
