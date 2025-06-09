const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.addClassroomCourse = async (req, res) => {
    try {
        const db = getDB();
        const { classroomId, courseId, hidden } = req.body;

        if (!classroomId || !courseId) {
            return res.status(400).json({ success: false, message: 'Missing classroomId or courseId' });
        }

        const result = await db.collection('Classroom_Course').insertOne({
            classroomId: new ObjectId(classroomId),
            courseId: new ObjectId(courseId),
            hidden: hidden || false
        });

        res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error('Error adding ClassroomCourse:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
