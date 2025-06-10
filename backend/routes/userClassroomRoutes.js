const express = require('express');
const router = express.Router();
const userClassroomController = require('../controllers/userClassroomController');

router.post('/', userClassroomController.addUserToClassroom);
router.get('/user/:userId', userClassroomController.getClassroomsForUser);


module.exports = router;