const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.createChapter = async (req, res) => {
    try {
        const db = getDB();
        const { courseId, title, orderIndex } = req.body;

        if (!courseId || !title || orderIndex === undefined) {
            return res.status(400).json({ success: false, message: 'courseId, title, or orderIndex is missing.' });
        }

        const newChapter = {
            courseId: new ObjectId(courseId),
            title,
            orderIndex
        };

        const result = await db.collection('Chapters').insertOne(newChapter);

        res.status(201).json({
            success: true,
            chapterId: result.insertedId,
            ...newChapter
        });
    } catch (error) {
        console.error('Error creating chapter:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

