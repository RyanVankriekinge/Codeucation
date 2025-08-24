const mongoose = require('mongoose');
const Chapter = require('../models/Chapter');
const ExerciseProgress = require('../models/ExerciseProgress');
const Exercise = require('../models/Exercise');

exports.upsertProgress = async (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const userId = req.session.user.userId;
    const { exerciseId, status, lastOutput } = req.body;

    if (!exerciseId || !status) {
        return res.status(400).json({ message: 'exerciseId and status are required' });
    }

    try {
        const progress = await ExerciseProgress.findOneAndUpdate(
            { userId, exerciseId },
            { status, lastOutput, $inc: { attempts: 1 } },
            { upsert: true, returnDocument: 'after' }
        );

        res.json(progress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save progress' });
    }
};

exports.getExerciseProgressByChapter = async (req, res) => {
    try {
        const { chapterId } = req.params;
        if (!req.session || !req.session.user) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }

        const userId = req.session.user.userId;
        console.log(userId);
        if (!mongoose.Types.ObjectId.isValid(chapterId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid chapter ID or user ID' });
        }
        const chapter = await Chapter.findById(chapterId).lean();
        if (!chapter) {
            return res.status(404).json({ success: false, message: 'Chapter not found' });
        }
        const exercises = await Exercise.find({ chapterId }).lean();

        const progressList = await ExerciseProgress.find({
            userId,
            exerciseId: { $in: exercises.map(e => e._id) }
        }).lean();

        const exercisesWithProgress = exercises.map(ex => {
            const progress = progressList.find(p => p.exerciseId.toString() === ex._id.toString());
            return {
                ...ex,
                status: progress?.status || 'Niet gemaakt',
                attempts: progress?.attempts || 0,
                lastOutput: progress?.lastOutput || null
            };
        });

        res.json({
            chapter: {
                ...chapter,
                exercises: exercisesWithProgress
            }
        });

    } catch (error) {
        console.error('Error getting exercise progress by chapter:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};