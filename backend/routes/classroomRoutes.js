const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

router.post('/', classroomController.createClassroom);
router.get('/', classroomController.getAllClassrooms);
router.get('/school/:schoolId', classroomController.getClassroomsBySchool);
router.get('/:classroomId', classroomController.getClassroomById);

module.exports = router;