const mongoose = require('mongoose');

const exerciseValidationCodeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
}, {
    collection: 'exercisevalidationcode'
});

const ExerciseValidationCode = mongoose.model('ExerciseValidationCode', exerciseValidationCodeSchema);
module.exports = ExerciseValidationCode;
