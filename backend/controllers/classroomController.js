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

exports.getAllClassrooms = async (req, res) => {
    try {
        const db = getDB();
        const classrooms = await db.collection('Classrooms').find().toArray();
        res.json(classrooms);
    } catch (error) {
        console.error('Error getting classrooms:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getClassroomsBySchool = async (req, res) => {
    try {
        const db = getDB();
        const { schoolId } = req.params;

        if (!ObjectId.isValid(schoolId)) {
            return res.status(400).json({ error: 'Invalid schoolId' });
        }

        const classrooms = await db.collection('Classrooms').find({ schoolId: new ObjectId(schoolId) }).toArray();

        res.json(classrooms);
    } catch (error) {
        console.error('Error fetching classrooms by school:', error);
        res.status(500).json({ error: 'Server error' });
    }
};