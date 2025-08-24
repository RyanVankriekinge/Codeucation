const mongoose = require('mongoose');

const exerciseProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
    status: {
        type: String,
        enum: ['Niet gemaakt', 'Gedeeltelijk juist', 'Klaar'],
        default: 'Niet gemaakt'
    },
    attempts: { type: Number, default: 0 },
    lastOutput: { type: String }
});

const ExerciseProgress = mongoose.model('ExerciseProgress', exerciseProgressSchema);
module.exports = ExerciseProgress;
