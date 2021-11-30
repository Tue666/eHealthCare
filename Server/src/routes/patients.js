const express = require('express');
const router = express.Router();

// controllers
const patientsAPI = require('../app/controllers/PatientsAPI');

router.get('/:patientId', patientsAPI.findById);

module.exports = router;
