const mongoose = require('mongoose');

const userClassroomSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true }
});

const UserClassroom = mongoose.model('UserClassroom', userClassroomSchema);
module.exports = UserClassroom;
