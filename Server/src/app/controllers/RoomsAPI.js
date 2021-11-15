// models
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Room = require('../models/Room');
// utils
const { timeToMinutes } = require('../../utils/formatTime');

class RoomsAPI {
    // [GET] /rooms/:slugDepartmentId
    async listRoom(req, res) {
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
                                    { $match: { doctorId: _id.toString(), status: 'success' } },
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

    // [POST] /rooms/join
    async joinRoom(req, res) {
        try {
            const room = new Room(req.body);
            await room.save();
            res.json({
                message: 'Create room successfully!'
            });
        } catch (error) {
            console.log(error);
        }
    };
};
module.exports = new RoomsAPI;
