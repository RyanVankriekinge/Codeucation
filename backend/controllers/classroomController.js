const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.createClassroom = async (req, res) => {
    try {
        const db = getDB();
        const { name, schoolId } = req.body;

        if (!name || !schoolId) return res.status(400).json({ error: 'Name and schoolId are required' });

        const classroom = {
            name,
            schoolId: new ObjectId(schoolId)
        };

        const result = await db.collection('Classrooms').insertOne(classroom);

        res.status(201).json({ success: true, classroomId: result.insertedId, ...classroom });
    } catch (error) {
        console.error('Error creating classroom:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

