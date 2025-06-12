const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.addClassroomCourse = async (req, res) => {
    try {
        const db = getDB();
        const { classroomId, courseId, hidden } = req.body;

        if (!classroomId || !courseId) {
            return res.status(400).json({ success: false, message: 'Missing classroomId or courseId' });
        }

        const result = await db.collection('Classroom_Course').insertOne({
            classroomId: new ObjectId(classroomId),
            courseId: new ObjectId(courseId),
            hidden: hidden || false
        });

        res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error('Error adding ClassroomCourse:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCoursesInClassroom = async (req, res) => {
    try {
        const db = getDB();
        const { classroomId } = req.params;

        if (!classroomId) {
            return res.status(400).json({ success: false, message: 'Missing classroomId' });
        }

        const links = await db.collection('Classroom_Course')
            .find({ classroomId: new ObjectId(classroomId) })
            .toArray();

        res.json(links);
    } catch (error) {
        console.error('Error getting courses in classroom:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const toggleCourseVisibility = async (course, event) => {
    try {
        event.preventDefault();
        event.stopPropagation();

        console.log("Sending visibility update request for:", course._id, "Current hidden value:", !course.hidden);

        const response = await axios.put(`http://localhost:3000/api/classroom-courses/${classroomId}/${course._id}/visibility`, {
            hidden: !course.hidden
        });

        console.log("Response from server:", response.data);

        if (response.data.updatedCourse) {
            course.hidden = response.data.updatedCourse.hidden;
        }
    } catch (error) {
        console.error("Error updating course visibility:", error.response?.data || error.message);
    }
};

