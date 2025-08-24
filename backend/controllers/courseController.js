const mongoose = require('mongoose');
const Course = require('../models/Course');
const ClassroomCourse = require('../models/ClassroomCourse');
const Classroom = require('../models/Classroom');
const Chapter = require('../models/Chapter');
const UserClassroom = require('../models/UserClassroom');
const Exercise = require('../models/Exercise');

exports.createCourse = async (req, res) => {
    try {
        const { title, description, author } = req.body;

        if (!title || !author) {
            return res.status(400).json({ error: 'Title and author are required' });
        }

        const newCourse = new Course({ title, description: description || "", author });
        await newCourse.save();

        res.status(201).json({
            success: true,
            courseId: newCourse._id,
            ...newCourse.toObject()
        });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error('Error getting courses:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid course ID' });
        }

        const course = await Course.findById(id).lean();
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const chapters = await Chapter.find({ courseId: id }).lean();

        for (const chapter of chapters) {
            const exercises = await Exercise.find({ chapterId: chapter._id }).lean();
            chapter.exercises = exercises;
        }

        const classroomCourses = await ClassroomCourse.find({ courseId: id }).lean();
        const classroomIds = classroomCourses.map(cc => cc.classroomId);

        const classrooms = await Classroom.find({ _id: { $in: classroomIds } })
            .populate('schoolId')
            .lean();

        res.json({
            ...course,
            chapters,
            classrooms
        });

    } catch (error) {
        console.error('Error getting course by ID:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.getCourseByIdForUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.session || !req.session.user) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }

        const userId = req.session.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid course ID or user ID' });
        }

        const course = await Course.findById(id).lean();
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const classroomCourses = await ClassroomCourse.find({ courseId: id }).lean();
        const allClassroomIds = classroomCourses.map(cc => cc.classroomId);

        const userClassrooms = await UserClassroom.find({
            userId,
            classroomId: { $in: allClassroomIds }
        }).lean();

        const userClassroomIds = userClassrooms.map(uc => uc.classroomId);

        const classrooms = await Classroom.find({ _id: { $in: userClassroomIds } })
            .populate('schoolId')
            .lean();

        const chapters = await Chapter.find({ courseId: id }).lean();

        res.json({
            ...course,
            chapters,
            classrooms
        });

    } catch (error) {
        console.error('Error getting course by ID for user:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
