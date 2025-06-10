const { getDB } = require('../db');
const { ObjectId } = require('mongodb');
const { createUserClassroom } = require('../models/UserClassroom');

exports.addUserToClassroom = async (req, res) => {
    try {
        const { userId, classroomId } = req.body;
        const db = getDB();
        const doc = createUserClassroom(userId, classroomId);
        await db.collection('User_Classroom').insertOne(doc);
        res.status(201).json({ success: true, message: 'User added to classroom' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getClassroomsForUser = async (req, res) => {
    try {
        const db = getDB();
        const userId = req.params.userId;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }
        const userClassrooms = await db.collection('User_Classroom').find({ userId: new ObjectId(userId) }).toArray();

        if (userClassrooms.length === 0) {
            return res.json([]);
        }

        const classroomIds = userClassrooms.map(uc => new ObjectId(uc.classroomId));

        const classrooms = await db.collection('Classrooms').find({_id: { $in: classroomIds }}).toArray();
        res.json(classrooms);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
