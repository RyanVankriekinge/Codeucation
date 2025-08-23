const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');

exports.createExercise = async (req, res) => {
    try {
        const { chapterId, title, instruction, starterCode, testFile } = req.body;

        if (!chapterId || !title) {
            return res.status(400).json({ success: false, message: 'chapterId and title are required' });
        }

        const newExercise = new Exercise({
            chapterId,
            title,
            instruction,
            starterCode,
            testFile
        });
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

exports.getExerciseById = async (req, res) => {
    try {
        const { exerciseId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
            return res.status(400).json({ success: false, message: 'Invalid exercise ID' });
        }

        const exercise = await Exercise.findById(exerciseId);
        if (!exercise) {
            return res.status(404).json({ success: false, message: 'Exercise not found' });
        }

        res.json(exercise);
    } catch (error) {
        console.error('Error getting exercise by ID:', error);
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
