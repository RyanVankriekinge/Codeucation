const ClassroomCourse = require('../models/ClassroomCourse');

exports.addClassroomCourse = async (req, res) => {
    try {
        const { classroomId, courseId, hidden } = req.body;

        if (!classroomId || !courseId) {
            return res.status(400).json({ success: false, message: 'Missing classroomId or courseId' });
        }

        const newEntry = new ClassroomCourse({
            classroomId,
            courseId,
            hidden: hidden || false
        });

        await newEntry.save();
        res.status(201).json({ success: true, id: newEntry._id });
    } catch (error) {
        console.error('Error adding ClassroomCourse:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCoursesInClassroom = async (req, res) => {
    try {
        const { classroomId } = req.params;

        if (!classroomId) {
            return res.status(400).json({ success: false, message: 'Missing classroomId' });
        }

        const courses = await ClassroomCourse.find({ classroomId }).populate('courseId');
        res.json(courses);
    } catch (error) {
        console.error('Error getting courses in classroom:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.toggleCourseVisibility = async (req, res) => {
    try {
        const { classroomId, courseId } = req.params;
        const { hidden } = req.body;

        const updatedCourse = await ClassroomCourse.findOneAndUpdate(
            { classroomId, courseId },
            { hidden },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: "Classroom course not found" });
        }

        res.json({ success: true, updatedCourse });
    } catch (error) {
        console.error("Error updating course visibility:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

