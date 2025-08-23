const express = require('express');
const router = express.Router();
const controller = require('../controllers/exerciseProgressController');

router.post('/', controller.upsertProgress);

module.exports = router;
