const express = require('express');
const router = express.Router();
const userClassroomController = require('../controllers/userClassroomController');

router.post('/', userClassroomController.addUserToClassroom);

module.exports = router;