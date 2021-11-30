const express = require('express');
const router = express.Router();

// controllers
const roomsAPI = require('../app/controllers/RoomsAPI');
// middlewares
const verifyToken = require('../app/middlewares/verifyToken');

router.post('/join', verifyToken, roomsAPI.joinRoom);
router.post('/diagnosis', verifyToken, roomsAPI.diagnosis);
router.get('/examined/:examinedId', verifyToken, roomsAPI.findExamined);
router.get('/examined', verifyToken, roomsAPI.findAllExamined);
router.get('/p', verifyToken, roomsAPI.findByPatient);
router.get('/:slugDepartmentId', verifyToken, roomsAPI.findAllRoom);
router.get('/', verifyToken, roomsAPI.findAllPatient);

module.exports = router;