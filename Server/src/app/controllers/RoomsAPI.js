// models
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Room = require('../models/Room');
const Medicine = require('../models/Medicine');
const Prescription = require('../models/Prescription');
// utils
const { timeToMinutes } = require('../../utils/formatTime');

class RoomsAPI {
    // [GET] /rooms/:slugDepartmentId
    async findAllRoom(req, res) {
        try {
            const { slugDepartmentId } = req.params;
            const now = new Date();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const day = days[now.getDay()];
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            let result = [];
            const doctors = await Doctor
                .find({
                    departmentId: slugDepartmentId,
                    dutyDay: day
                });
            await Promise.all(doctors.map(async _doctor => {
                const { _id, dutyFrom, dutyTo } = _doctor;
                if (currentMinutes >= timeToMinutes(dutyFrom) && currentMinutes <= timeToMinutes(dutyTo)) {
                    const query = await Room.aggregate([
                        {
                            $facet: {
                                patientInRoom: [
                                    { $match: { doctorId: _id.toString(), status: 'examinating' } },
                                    { $sort: { createdAt: 1 } },
                                    { $limit: 1 }
                                ],
                                queue: [
                                    { $match: { doctorId: _id.toString(), status: 'processing' } },
                                    {
                                        $group: {
                                            _id: null,
                                            count: { $sum: 1 }
                                        }
                                    }
                                ]
                            }
                        }
                    ]);
                    const { code, password, ...doctor } = _doctor.toObject();
                    const { patientInRoom, queue } = query[0];
                    const patientId = patientInRoom[0] ? patientInRoom[0].patientId : null;
                    const patient = await Patient
                        .findOne({
                            _id: patientId
                        });
                    result.push({
                        doctor,
                        currentPatient: patient ? patient.name : null,
                        inQueue: queue[0] ? queue[0].count : 0
                    });
                }
            }));
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /rooms
    async findAllPatient(req, res) {
        const doctor = await Doctor
            .findOne({ accountId: req.account._id });
        const rooms = await Room
            .find({
                doctorId: doctor._id,
                status: 'processing'
            })
            .sort({ createdAt: 1 });
        let patients = [];
        await Promise.all(rooms.map(async room => {
            const { patientId } = room;
            const patient = await Patient
                .findOne({
                    _id: patientId
                })
            patients.push(patient);
        }));
        res.json(patients);
    };

    // [GET] /rooms/examined
    async findAllExamined(req, res) {
        try {
            const { _id } = req.account;
            const patient = await Patient
                .findOne({ accountId: _id });
            const examined = await Room
                .find({
                    patientId: patient._id,
                    status: 'examined'
                });
            res.json(examined);
        } catch (error) {
            console.log(error);
        };
    };

    // [GET] /rooms/examined/:examinedId
    async findExamined(req, res) {
        try {
            const { examinedId } = req.params;
            const room = await Room
                .findOne({ _id: examinedId });
            if (!room) {
                res.json([]);
                return;
            }
            const doctor = await Doctor
                .findOne({
                    _id: room.doctorId
                });
            const { code, password, ...doctorInfor } = doctor.toObject();
            const prescription = await Prescription
                .find({ _roomId: room._roomId });
            let result = [];
            await Promise.all(prescription.map(async p => {
                const { medicineId } = p;
                const medicine = await Medicine
                    .findOne({ _id: medicineId });
                result.push({
                    ...p.toObject(),
                    medicineName: medicine.name
                });
            }));
            res.json({
                room,
                doctor: doctorInfor,
                prescription: result
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /rooms/p
    async findByPatient(req, res) {
        try {
            const patient = await Patient
                .findOne({ accountId: req.account._id });
            const room = await Room
                .findOne({
                    patientId: patient._id,
                    status: 'processing'
                });
            if (!room) {
                res.json([]);
                return;
            }
            const doctor = await Doctor
                .findOne({
                    _id: room.doctorId
                });
            const { code, password, ...doctorInfor } = doctor.toObject();
            res.json({
                room,
                doctor: doctorInfor
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /rooms/join
    async joinRoom(req, res) {
        try {
            const patient = await Patient
                .findOne({ accountId: req.account._id });
            const isExaminating = await Room
                .findOne({
                    patientId: patient._id,
                    status: 'processing'
                });
            if (isExaminating) {
                res.json({
                    status: 'error',
                    message: 'You are waiting in another room!'
                });
                return;
            }
            const { doctorId } = req.body;
            const room = new Room({
                doctorId,
                patientId: patient._id
            });
            await room.save();
            res.json({
                status: 'success',
                message: 'Join room successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /rooms/diagnosis
    async diagnosis(req, res) {
        try {
            const { _id } = req.account;
            const { patientId, diagnosis, prescription } = req.body;
            const doctor = await Doctor
                .findOne({ accountId: _id });
            const room = await Room
                .findOne({
                    patientId: patientId,
                    doctorId: doctor._id
                });
            await Promise.all(prescription.map(async p => {
                const { _id, amount, time } = p;
                const pre = new Prescription({
                    _roomId: room._roomId,
                    medicineId: _id,
                    amount,
                    time
                });
                await pre.save();
            }));
            room.diagnosis = diagnosis;
            room.status = 'examined';
            room.updatedBy = doctor.name;
            await room.save();
            res.json({
                status: 'success',
                message: 'Patient examined'
            });
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new RoomsAPI;
