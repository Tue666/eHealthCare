const express = require('express');
const router = express.Router();

// controllers
const rolesAPI = require('../app/controllers/RolesAPI');

router.post('/', rolesAPI.insertRole);

module.exports = router;