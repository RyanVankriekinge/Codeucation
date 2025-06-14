const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');

exports.createExercise = async (req, res) => {
    try {
        const { chapterId, title } = req.body;

        if (!chapterId || !title) {
            return res.status(400).json({ success: false, message: 'chapterId and title are required' });
        }

        const newExercise = new Exercise({ chapterId, title });
        await newExercise.save();

        res.status(201).json({
            success: true,
            exerciseId: newExercise._id,
            ...newExercise.toObject()
        });
    } catch (error) {
        console.error('Error creating exercise:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        console.error('Error getting exercises:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getExercisesByChapterId = async (req, res) => {
    try {
        const { chapterId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ success: false, message: 'Invalid chapter ID' });
        }

        const exercises = await Exercise.find({ chapterId });
        res.json(exercises);
    } catch (error) {
        console.error('Error getting exercises by chapterId:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
