const express = require('express');
const router = express.Router();

// controllers
const insurancesAPI = require('../app/controllers/InsurancesAPI');

router.post('/', insurancesAPI.insertInsurance);

module.exports = router;