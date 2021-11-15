const express = require('express');
const router = express.Router();

// controllers
const roomsAPI = require('../app/controllers/RoomsAPI');

router.post('/join', roomsAPI.joinRoom);
router.get('/:slugDepartmentId', roomsAPI.listRoom);

module.exports = router;