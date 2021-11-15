const express = require('express');
const router = express.Router();

// controllers
const doctorsAPI = require('../app/controllers/DoctorsAPI');

router.post('/', doctorsAPI.addDoctor);

module.exports = router;