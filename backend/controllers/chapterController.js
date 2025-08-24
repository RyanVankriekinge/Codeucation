const mongoose = require('mongoose');
const Chapter = require('../models/Chapter');
const Course = require('../models/Course');
const Exercise = require('../models/Exercise');


exports.createChapter = async (req, res) => {
    try {
        const { courseId, title, orderIndex } = req.body;

        if (!courseId || !title || orderIndex === undefined) {
            return res.status(400).json({ success: false, message: 'courseId, title, or orderIndex is missing.' });
        }

        const newChapter = new Chapter({ courseId, title, orderIndex });
        await newChapter.save();

        res.status(201).json({
            success: true,
            chapterId: newChapter._id,
            ...newChapter.toObject()
        });
    } catch (error) {
        console.error('Error creating chapter:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find();
        res.json(chapters);
    } catch (error) {
        console.error('Error fetching chapters:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getChaptersByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: 'Invalid course ID' });
        }

        const chapters = await Chapter.find({ courseId });
        res.json(chapters);
    } catch (error) {
        console.error('Error getting chapters:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getChapterById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid chapter ID' });
        }

        const chapter = await Chapter.findById(id).lean();
        if (!chapter) {
            return res.status(404).json({ success: false, message: 'Chapter not found' });
        }

        const course = await Course.findById(chapter.courseId).lean();
        if (course) {
            chapter.courseTitle = course.title;
        }

        const exercises = await Exercise.find({ chapterId: id }).lean();
        chapter.exercises = exercises;

        res.json({ chapter });
    } catch (error) {
        console.error('Error getting chapter by ID:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


