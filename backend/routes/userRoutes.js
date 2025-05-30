const express = require('express');
const { registerUser, loginUser, checkLogin, logout } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check-login', checkLogin);

module.exports = router;