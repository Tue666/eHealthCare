const express = require('express');
const router = express.Router();

// controllers
const medicinesAPI = require('../app/controllers/MedicinesAPI');

router.post('/', medicinesAPI.insertMedicine);
router.get('/', medicinesAPI.findAll);

module.exports = router;