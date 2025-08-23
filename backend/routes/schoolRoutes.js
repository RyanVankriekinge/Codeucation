const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.post('/', schoolController.createSchool);
router.get('/', schoolController.getAllSchools);

module.exports = router;
