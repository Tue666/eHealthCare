const express = require('express');
const router = express.Router();

// controllers
const patientsAPI = require('../app/controllers/PatientsAPI');
// middlewares
const verifyToken = require('../app/middlewares/verifyToken');

router.get('/verify', verifyToken, (req, res) => {
    res.json(!!req.user._id);
});
router.post('/refreshToken', patientsAPI.refreshToken);
router.get('/profile', verifyToken, patientsAPI.getProfile);
router.post('/login', patientsAPI.login);
router.post('/register', patientsAPI.register);

module.exports = router;
