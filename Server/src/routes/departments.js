const express = require('express');
const router = express.Router();

// controllers
const departmentsAPI = require('../app/controllers/DepartmentsAPI');

router.post('/', departmentsAPI.addDepartment);
router.get('/', departmentsAPI.listDepartment);

module.exports = router;