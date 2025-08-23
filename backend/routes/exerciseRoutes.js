const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/', exerciseController.createExercise);
router.get('/', exerciseController.getAllExercises);
router.get('/chapter/:chapterId', exerciseController.getExercisesByChapterId);
router.get('/:exerciseId', exerciseController.getExerciseById);

module.exports = router;
