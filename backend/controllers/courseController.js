const mongoose = require('mongoose');
const Course = require('../models/Course');

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

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        console.error('Error getting course by ID:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
