const express = require('express');
const router = express.Router();
const classroomCourseController = require('../controllers/classroomCourseController');

router.post('/', classroomCourseController.addClassroomCourse);
router.get('/:classroomId', classroomCourseController.getCoursesInClassroom);
router.put('/:classroomId/:courseId/visibility', classroomCourseController.toggleCourseVisibility);

module.exports = router;
