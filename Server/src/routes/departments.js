const express = require('express');
const router = express.Router();

// controllers
const departmentsAPI = require('../app/controllers/DepartmentsAPI');

router.post('/', departmentsAPI.insertDepartment);
router.get('/', departmentsAPI.findAll);

module.exports = router;