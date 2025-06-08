const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

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

exports.getAllCourses = async (req, res) => {
    try {
        const db = getDB();
        const courses = await db.collection('Courses').find().toArray();
        res.json(courses);
    } catch (error) {
        console.error('Error getting courses:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const db = getDB();
        const courseId = req.params.id;

        if (!ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: 'Invalid course ID' });
        }

        const course = await db.collection('Courses').findOne({ _id: new ObjectId(courseId) });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        console.error('Error getting course by ID:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};