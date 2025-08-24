const ExerciseProgress = require('../models/ExerciseProgress');

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
