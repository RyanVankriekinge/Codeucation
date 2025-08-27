const express = require('express');
const { registerUser, loginUser, checkLogin, logout, getCoursesForUser, getCourseProgressForUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check-login', checkLogin);
router.post('/logout', logout);
router.get('/:userId/courses', getCoursesForUser);
router.get('/:userId/courses/:courseId/progress', getCourseProgressForUser);

module.exports = router;
