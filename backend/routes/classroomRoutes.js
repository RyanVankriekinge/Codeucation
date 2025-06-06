const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

router.post('/', classroomController.createClassroom);

module.exports = router;