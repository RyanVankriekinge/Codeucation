const UserClassroom = require('../models/UserClassroom');
const Classroom = require('../models/Classroom');
const School = require('../models/School');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.addUserToClassroom = async (req, res) => {
    try {
        const { userId, classroomId } = req.body;
        if (!userId || !classroomId) {
            return res.status(400).json({ success: false, message: 'Missing userId or classroomId' });
        }

        const newEntry = new UserClassroom({ userId, classroomId });
        await newEntry.save();
        res.status(201).json({ success: true, message: 'User added to classroom' });
    } catch (err) {
        console.error('Error adding user to classroom:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getClassroomsForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        const userClassrooms = await UserClassroom.find({ userId }).populate('classroomId');
        if (!userClassrooms.length) return res.json([]);

        const classroomIds = userClassrooms.map(uc => uc.classroomId._id);
        const classrooms = await Classroom.find({ _id: { $in: classroomIds } }).populate('schoolId');

        const classroomWithSchoolAndPupilCount = await Promise.all(classrooms.map(async (classroom) => {
            const usersInClassroom = await UserClassroom.find({ classroomId: classroom._id });
            const userIds = usersInClassroom.map(uc => uc.userId);
            const users = await User.find({ _id: { $in: userIds } });

            const pupilCount = users.filter(user => user.role === 'leerling').length;

            return {
                ...classroom.toObject(),
                schoolName: classroom.schoolId ? classroom.schoolId.name : "Unknown School",
                studentCount: pupilCount
            };
        }));

        res.json(classroomWithSchoolAndPupilCount);
    } catch (error) {
        console.error('Error getting classrooms for user:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
