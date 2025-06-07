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