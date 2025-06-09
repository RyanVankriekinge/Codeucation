const express = require('express');
const router = express.Router();
const classroomCourseController = require('../controllers/classroomCourseController');

router.post('/', classroomCourseController.addClassroomCourse);
router.get('/:classroomId', classroomCourseController.getCoursesInClassroom);

module.exports = router;
