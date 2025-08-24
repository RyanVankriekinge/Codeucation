const mongoose = require('mongoose');

const classroomCourseSchema = new mongoose.Schema({
    classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    hidden: { type: Boolean, default: false }
});

const ClassroomCourse = mongoose.model('ClassroomCourse', classroomCourseSchema);
module.exports = ClassroomCourse;
