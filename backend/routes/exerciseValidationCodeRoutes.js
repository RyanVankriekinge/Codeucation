const express = require('express');
const router = express.Router();
const exerciseValidationCodeController = require('../controllers/exerciseValidationCodeController');

router.get('/:exerciseValidationCodeName', exerciseValidationCodeController.getExerciseValidationCodeByName);

module.exports = router;