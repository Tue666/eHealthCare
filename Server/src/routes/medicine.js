const express = require('express');
const router = express.Router();

// controllers
const medicinesAPI = require('../app/controllers/MedicinesAPI');
// middlewares
const verifyToken = require('../app/middlewares/verifyToken');

router.delete('/:medicineId', verifyToken, medicinesAPI.deleteById);
router.patch('/', verifyToken, medicinesAPI.deleteAll);
router.put('/:medicineId', verifyToken, medicinesAPI.editMedicine);
router.post('/', verifyToken, medicinesAPI.insertMedicine);
router.get('/', verifyToken, medicinesAPI.findAll);

module.exports = router;