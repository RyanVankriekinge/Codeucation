const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

router.post('/', chapterController.createChapter);
router.get('/', chapterController.getAllChapters);
router.get('/course/:courseId', chapterController.getChaptersByCourse);

module.exports = router;
