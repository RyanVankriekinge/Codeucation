const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
});

const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;
