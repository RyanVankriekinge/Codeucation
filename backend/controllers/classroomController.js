const mongoose = require('mongoose');
const Classroom = require('../models/Classroom');
const School = require('../models/School');
const UserClassroom = require('../models/UserClassroom');
const User = require('../models/User');
const ClassroomCourse = require('../models/ClassroomCourse');
const Course = require('../models/Course');

exports.createClassroom = async (req, res) => {
    try {
        const { name, schoolId } = req.body;
        if (!name || !schoolId) return res.status(400).json({ error: 'Name and schoolId are required' });

        const newClassroom = new Classroom({ name, schoolId });
        await newClassroom.save();

        res.status(201).json({ success: true, classroomId: newClassroom._id, name });
    } catch (error) {
        console.error('Error creating classroom:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.json(classrooms);
    } catch (error) {
        console.error('Error getting classrooms:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getClassroomsBySchool = async (req, res) => {
    try {
        const { schoolId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(schoolId)) {
            return res.status(400).json({ error: 'Invalid schoolId' });
        }

        const classrooms = await Classroom.find({ schoolId });
        res.json(classrooms);
    } catch (error) {
        console.error('Error fetching classrooms by school:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getClassroomById = async (req, res) => {
    try {
        const { classroomId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(classroomId)) {
            return res.status(400).json({ success: false, message: 'Invalid classroom ID' });
        }

        const classroom = await Classroom.findById(classroomId).populate('schoolId');
        if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

        const userClassrooms = await UserClassroom.find({ classroomId });
        const userIds = userClassrooms.map(uc => uc.userId.toString());
        const users = await User.find({ _id: { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) } });

        const teachers = users
            .filter(user => user.role === 'leraar')
            .map(user => `${user.firstname} ${user.name}`);

        const students = users
            .filter(user => user.role === 'leerling')
            .map(user => ({
                _id: user._id,
                firstname: user.firstname,
                name: user.name
            }));

        const classroomCourses = await ClassroomCourse.find({ classroomId });
        const courseIds = classroomCourses.map(cc => cc.courseId);
        const courses = await Course.find({ _id: { $in: courseIds } });

        const formattedCourses = await Promise.all(classroomCourses.map(async (cc) => {
            const course = await Course.findById(cc.courseId);
            return {
                _id: cc.courseId,
                title: course ? course.title : "Unknown Course",
                hidden: cc.hidden || false,
            };
        }));


        const responseClassroom = {
            _id: classroom._id,
            name: classroom.name,
            schoolId: classroom.schoolId._id,
            schoolName: classroom.schoolId.name || "Unknown School",
            teachers: teachers.length ? teachers : [],
            students: students.length ? students : [],
            courses: formattedCourses.length ? formattedCourses : []
        };

        res.json(responseClassroom);
    } catch (error) {
        console.error('Error fetching classroom info:', error);
        res.status(500).json({ error: 'Server error' });
    }
};