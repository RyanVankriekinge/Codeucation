const { getDB } = require('../db');

exports.createExercise = async (req, res) => {
    try {
        const db = getDB();
        const { chapterId, title } = req.body;

        if (!chapterId || !title) {
            return res.status(400).json({ success: false, message: 'chapterId and title are required' });
        }

        const result = await db.collection('Exercises').insertOne({
            chapterId,
            title
        });

        res.status(201).json({ success: true, exerciseId: result.insertedId, chapterId, title });
    } catch (error) {
        console.error('Error creating exercise:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllExercises = async (req, res) => {
    try {
        const db = getDB();
        const exercises = await db.collection('Exercises').find().toArray();
        res.json(exercises);
    } catch (error) {
        console.error('Error getting exercises:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getExercisesByChapterId = async (req, res) => {
    try {
        const db = getDB();
        const { chapterId } = req.params;

        const exercises = await db.collection('Exercises').find({ chapterId }).toArray();
        res.json(exercises);
    } catch (error) {
        console.error('Error getting exercises by chapterId:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
