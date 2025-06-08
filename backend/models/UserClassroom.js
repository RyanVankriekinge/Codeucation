const { ObjectId } = require('mongodb');

function createUserClassroom(userId, classroomId) {
    return {
        userId: new ObjectId(userId),
        classroomId: new ObjectId(classroomId)
    };
}

module.exports = { createUserClassroom };