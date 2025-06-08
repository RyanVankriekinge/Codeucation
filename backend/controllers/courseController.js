const { getDB } = require('../db');

exports.createCourse = async (req, res) => {
    try {
        const db = getDB();
        const { title, description, author } = req.body;

        if (!title || !author) {
            return res.status(400).json({ error: 'Title and author are required' });
        }

        const newCourse = {
            title,
            description: description || '',
            author
        };

        const result = await db.collection('Courses').insertOne(newCourse);

        res.status(201).json({
            success: true,
            courseId: result.insertedId,
            ...newCourse
        });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
