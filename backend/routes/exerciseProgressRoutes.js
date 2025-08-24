const express = require('express');
const router = express.Router();
const controller = require('../controllers/exerciseProgressController');

router.post('/', controller.upsertProgress);
router.get('/progress/:chapterId/current-user', controller.getExerciseProgressByChapter);

module.exports = router;
