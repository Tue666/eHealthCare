const express = require('express');
const router = express.Router();

// controllers
const accountsAPI = require('../app/controllers/AccountsAPI');
// middlewares
const verifyToken = require('../app/middlewares/verifyToken');

router.get('/verify', verifyToken, (req, res) => {
    return res.json(req.account.role);
});

router.get('/profile', verifyToken, accountsAPI.getProfile);
router.post('/refreshToken', accountsAPI.refreshToken);
router.post('/login', accountsAPI.login);
router.post('/register', accountsAPI.register);

module.exports = router;